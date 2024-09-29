from openai import OpenAI
from dotenv import dotenv_values
from pathlib import Path
from collections.abc import Iterable

def flatten(xs):
    for x in xs:
        if isinstance(x, Iterable) and not isinstance(x, (str, bytes)):
            yield from flatten(x)
        else:
            yield x

config = dotenv_values(Path(__file__).parent / ".env")
YOUR_API_KEY = config["PERPLEXITY_API_KEY"]

client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")


def suggest(query):
    messages = [
        {
            "role": "system",
            "content": (
                "You are an artificial intelligence assistant and you need to "
                "engage in a helpful, detailed, polite conversation with a user."
            ),
        },
    ]

    messages.append(
        {
            "role": "user",
            "content": f"Given the following content, suggest me some resources on the topic: {query}",
        }
    )

    response = client.chat.completions.create(
        model="llama-3.1-sonar-small-128k-online",
        messages=messages,
    )

    message_content = response.choices[0].message.content

    return message_content
