from openai import OpenAI
from dotenv import dotenv_values
from pathlib import Path


config = dotenv_values(Path(__file__).parent / ".env")
YOUR_API_KEY = config["PERPLEXITY_API_KEY"]

messages = [
    {
        "role": "system",
        "content": (
            "You are an artificial intelligence assistant and you need to "
            "engage in a helpful, detailed, polite conversation with a user."
        ),
    },
    {
        "role": "user",
        "content": ("How many stars are in the universe?"),
    },
]

client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# chat completion without streaming
response = client.chat.completions.create(
    model="llama-3.1-sonar-small-128k-online",
    messages=messages,
)

# # chat completion with streaming
# response_stream = client.chat.completions.create(
#     model="llama-3-sonar-large-32k-online",
#     messages=messages,
#     stream=True,
# )
# for response in response_stream:
#     print(response)
