{
  "name": "EcoActivity",
  "type": "object",
  "properties": {
    "activity_type": {
      "type": "string",
      "enum": [
        "transport",
        "food",
        "energy",
        "waste",
        "water",
        "shopping"
      ],
      "description": "Category of the eco activity"
    },
    "action": {
      "type": "string",
      "description": "Specific action taken"
    },
    "carbon_saved": {
      "type": "number",
      "description": "Estimated kg of CO2 saved"
    },
    "points_earned": {
      "type": "number",
      "description": "Points earned for this activity"
    },
    "date": {
      "type": "string",
      "format": "date"
    },
    "notes": {
      "type": "string"
    }
  },
  "required": [
    "activity_type",
    "action",
    "date"
  ]
}
