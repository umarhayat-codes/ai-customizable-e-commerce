from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agents.customize_ecommerce_agent import customize_agent

# ---------------------- Initialize Router ---------------------- #
customize_routes = APIRouter()

# ---------------------- Define Request Schema ---------------------- #
class DesignInput(BaseModel):
    aiPrompt: str

# ---------------------- FastAPI ENDPOINT ---------------------- #
@customize_routes.post("/generate-design")
async def generate_design(data: DesignInput):
    try:
        # Pass user input to agent
        result = customize_agent.invoke({"input_text": data.aiPrompt})
        
        enhanced_prompt = result.get("enhanced_suggestion")
        generated_images = result.get("generated_images", [])
        
        # Format for frontend: list of {image_base64, enhanced_prompt}
        formatted_data = [
            {"image_base64": img, "enhanced_prompt": enhanced_prompt}
            for img in generated_images
        ]
        
        return {
            "status": "success",
            "data": formatted_data
        }
    except Exception as e:
        print("-----error----",e)
        raise HTTPException(status_code=500, detail=str(e))
