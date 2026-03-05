import os
import requests
import base64
from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv

# ---------------------- Load Environment Variables ---------------------- #
load_dotenv()

# ---------------------- Initialize LLM ---------------------- #
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

# ---------------------- Define Graph State ---------------------- #
class AgentState(TypedDict):
    input_text: str
    enhanced_suggestion: str
    generated_images: list[str]

# ---------------------- Node: LLM Enhancement ---------------------- #

def enhance_design_node(state: AgentState):
    user_input = state.get("input_text")
    print("-----user_input-----",user_input)
    system_prompt = (
            "You are a product design expert specializing in creating concise image generation prompts. "
            "Take the user's design idea and create a SHORT, focused description (1-2 sentences maximum) "
            "that includes ONLY the most important visual elements: colors, patterns, materials, style, and key features. "
            "Format: Write a single clear sentence optimized for AI image generation. "
            "Do NOT include long explanations, packaging details, target audience, or feature lists."
        )
    
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=f"Enhance this design idea: {user_input}")
    ]
    print("----messages----",messages)
    response = llm.invoke(messages)
    print("----response-----",response)
    return {"enhanced_suggestion": response.content}

# ---------------------- Node: Image Generation ---------------------- #
def generate_images_node(state: AgentState):
    enhanced_text = state.get("enhanced_suggestion")
    print("-----enhanced_text for image generation-----", enhanced_text)

    API_URL = os.getenv("HUGGING_FACE_CUSTOMIZE_MODEL")
    print("-----API_URL-----",API_URL)
    headers = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE_CUSTOMIZE_TOKEN')}"}
    print("-----headers-----",headers)

    images = []

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        if response.status_code != 200:
            print(f"hf error response: {response.text}")
            return None
        return response.content
    # Generate 3 images
    for i in range(3):
        print(f"Generating image {i+1}/3...")
        try:
            image_bytes = query({
                "inputs": f"{enhanced_text}, high quality, product photography, studio lighting",
                "parameters": {"seed": 42 + i} # Different seed for each image
            })

            if image_bytes:
                # Convert bytes to base64 string
                base64_image = base64.b64encode(image_bytes).decode('utf-8')
                images.append(base64_image)
            else:
                print(f"Failed to generate image {i+1}")
        except Exception as e:
            print(f"Error generating image {i+1}: {e}")

    return {"generated_images": images}

# ---------------------- Build Graph ---------------------- #
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("enhance_design", enhance_design_node)
workflow.add_node("generate_images", generate_images_node)

# Add edges
workflow.add_edge(START, "enhance_design")
workflow.add_edge("enhance_design", "generate_images")
workflow.add_edge("generate_images", END)

# Compile graph
customize_agent = workflow.compile()
