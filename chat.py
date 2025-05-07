from openai import OpenAI

client = OpenAI(
  api_key="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"
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message)