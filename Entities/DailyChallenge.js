{
  "name": "DailyChallenge",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "transport",
        "food",
        "energy",
        "waste",
        "water",
        "shopping"
      ]
    },
    "points": {
      "type": "number"
    },
    "carbon_impact": {
      "type": "number",
      "description": "Estimated kg CO2 saved"
    },
    "difficulty": {
      "type": "string",
      "enum": [
        "easy",
        "medium",
        "hard"
      ]
    },
    "icon": {
      "type": "string"
    },
    "completed": {
      "type": "boolean",
      "default": false
    },
    "completed_date": {
      "type": "string",
      "format": "date"
    }
  },
  "required": [
    "title",
    "description",
    "category",
    "points"
  ]
}
