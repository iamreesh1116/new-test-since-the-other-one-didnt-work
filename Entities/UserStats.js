{
  "name": "UserStats",
  "type": "object",
  "properties": {
    "total_points": {
      "type": "number",
      "default": 0
    },
    "total_carbon_saved": {
      "type": "number",
      "default": 0
    },
    "current_streak": {
      "type": "number",
      "default": 0
    },
    "longest_streak": {
      "type": "number",
      "default": 0
    },
    "badges_earned": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "level": {
      "type": "number",
      "default": 1
    },
    "activities_count": {
      "type": "number",
      "default": 0
    }
  },
  "required": []
}
