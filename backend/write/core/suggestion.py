from openai import OpenAI
from dotenv import dotenv_values
from pathlib import Path
import markdown

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
            "content": (
                "Please analyze the following text and provide highly reputable "
                "citations only for statements that make specific factual claims, present data, "
                "or reference existing research that requires sourcing, or are not considered common knowledge. Do not include social media sites, or sources that can be publicly edited such as Wikipedia, "
                "as sources. For general statements, commonly used phrases in research papers "
                "(e.g., 'Here are the results'), or original content that does not require citations, "
                "please indicate 'None needed' for that part. If no suitable citation is found for a statement "
                "that requires one, indicate 'None found'. Do not generate citations based solely "
                "on keyword matching when the idea is not supported by the sources. For each sentence requiring a citation, provide the citation as a link and also format it in MLA 9 style."
                "Here is the text: " + query
            ),
        },
    )

    response = client.chat.completions.create(
        model="llama-3.1-sonar-small-128k-online",
        messages=messages,
    )

    message_content = response.choices[0].message.content
    message_content = message_content.replace("*", "")
    message_content = markdown.markdown(message_content)

    return message_content
