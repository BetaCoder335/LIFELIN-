"use strict";

window.LifelineTriageData = {
  "protocols": {
    "bleeding": {
      "protocol_id": "bleeding",
      "protocol_name": "Cuts, Wounds & Bleeding",
      "version": "2.1_CALM",
      "trigger_keywords": [
        "blood",
        "bleeding",
        "khoon",
        "wound",
        "cut",
        "gash"
      ],
      "entry_question": "bld_001",
      "questions": [
        {
          "id": "bld_001",
          "text": "How fast is the blood coming from the cut or wound?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "slow",
              "label": "A slow trickle or light ooze",
              "next": "bld_003"
            },
            {
              "id": "steady",
              "label": "Flowing steadily like water from a tap",
              "next": "bld_002"
            },
            {
              "id": "fast",
              "label": "Spurting or pouring out very quickly",
              "next": "BLD_RED_HEMORRHAGE"
            }
          ]
        },
        {
          "id": "bld_002",
          "text": "If you hold firm pressure on the wound with a clean towel for 5 to 10 minutes, what happens?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "slows",
              "label": "The bleeding slows down noticeably or stops",
              "next": "bld_003"
            },
            {
              "id": "wont_stop",
              "label": "It keeps soaking straight through the towel without stopping",
              "next": "BLD_RED_UNCONTROLLED"
            }
          ]
        },
        {
          "id": "bld_003",
          "text": "How does the wound look, and is the person feeling dizzy?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "dizzy",
              "label": "The person is feeling very dizzy, weak, or pale",
              "next": "BLD_RED_SHOCK"
            },
            {
              "id": "deep_cut",
              "label": "The person feels okay, but the cut is deep or gaping open",
              "next": "BLD_YELLOW_SUTURE"
            },
            {
              "id": "small_cut",
              "label": "Small surface cut or scrape, person feels fine",
              "next": "BLD_GREEN_MINOR"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "BLD_RED_HEMORRHAGE",
          "severity": "RED",
          "title": "Emergency Wound Care Required",
          "message": "Fast bleeding needs immediate firm pressure with a clean cloth. Press hard directly on the wound while calling for an ambulance.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "APPLY_DIRECT_FIRM_PRESSURE"
          ],
          "stop_assessment": true
        },
        {
          "id": "BLD_RED_UNCONTROLLED",
          "severity": "RED",
          "title": "Hospital Dressing & Stitches Needed",
          "message": "Because bleeding is continuing despite pressure, having a doctor dress the wound and close it is the right next step.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "APPLY_DIRECT_FIRM_PRESSURE"
          ],
          "stop_assessment": true
        },
        {
          "id": "BLD_RED_SHOCK",
          "severity": "RED",
          "title": "Rest Flat & Seek Medical Care",
          "message": "Feeling dizzy after bleeding means the body needs fluids and care. Lie down flat, raise your legs on pillows, and seek medical assistance.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "LIE_DOWN_ELEVATE_FEET",
            "APPLY_DIRECT_FIRM_PRESSURE"
          ],
          "stop_assessment": true
        },
        {
          "id": "BLD_YELLOW_SUTURE",
          "severity": "YELLOW",
          "title": "Stitches or Glue Recommended",
          "message": "A deep cut heals much cleaner and faster with professional stitches or medical glue. Visit a nearby clinic within the next 4 to 6 hours.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY",
            "APPLY_DIRECT_FIRM_PRESSURE"
          ],
          "stop_assessment": true
        },
        {
          "id": "BLD_GREEN_MINOR",
          "severity": "GREEN",
          "title": "Simple Home Wound Care",
          "message": "Rinse the cut under clean tap water with gentle soap. Pat dry, apply an antiseptic cream if you have one, and protect it with a clean bandage.",
          "actions": [],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "Keep continuous firm pressure on any bleeding cut without lifting the cloth to check.",
        "If an object like glass or metal is stuck deeply inside, do not pull it out; hold pressure around it and visit a clinic."
      ]
    },
    "breathing_dehydration": {
      "protocol_id": "breathing_dehydration",
      "protocol_name": "Breathing Distress & Severe Dehydration",
      "version": "2.0_OFFLINE",
      "trigger_keywords": [
        "breath",
        "breathing",
        "saas",
        "asthma",
        "gasping",
        "wheezing",
        "dehydration",
        "vomiting"
      ],
      "entry_question": "br_001",
      "questions": [
        {
          "id": "br_001",
          "text": "Is the person struggling so hard to breathe that they cannot speak more than 2 or 3 words without stopping, or are their lips turning blue/gray?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Severe breathing struggle / Blue lips)",
              "next": "RESP_RED_DISTRESS"
            },
            {
              "id": "no",
              "label": "No (Can speak short sentences)",
              "next": "br_002"
            }
          ]
        },
        {
          "id": "br_002",
          "text": "Is there a harsh, loud, high-pitched whistling sound when breathing IN (stridor), or a choking sensation in the throat?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Harsh whistling in / Choking feeling)",
              "next": "RESP_RED_AIRWAY"
            },
            {
              "id": "no",
              "label": "No airway whistling",
              "next": "br_003"
            }
          ]
        },
        {
          "id": "br_003",
          "text": "Are there symptoms of severe dehydration: unable to drink/keep fluids down, no urine for over 12 hours, or extreme lethargy?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Cannot keep fluids down / No urine 12h+)",
              "next": "DEHYD_RED_SHOCK"
            },
            {
              "id": "no",
              "label": "No (Able to sip fluids and pass urine)",
              "next": "BR_GREEN_MILD"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "RESP_RED_DISTRESS",
          "severity": "RED",
          "title": "Severe Respiratory Distress Alert",
          "message": "Acute breathlessness, inability to complete sentences, or blue lips indicate compromised lung function requiring emergency supplemental oxygen.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "SIT_UPRIGHT_DO_NOT_LIE_FLAT"
          ],
          "stop_assessment": true
        },
        {
          "id": "RESP_RED_AIRWAY",
          "severity": "RED",
          "title": "Upper Airway Obstruction Alert",
          "message": "Inspiratory stridor or throat swelling can progress rapidly. Immediate paramedic support and hospital care are required.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "SIT_UPRIGHT_DO_NOT_LIE_FLAT"
          ],
          "stop_assessment": true
        },
        {
          "id": "DEHYD_RED_SHOCK",
          "severity": "RED",
          "title": "Severe Dehydration / Fluid Deficit",
          "message": "Inability to keep fluids down combined with anuria requires rapid clinic/hospital IV fluid resuscitation.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "USE_ORAL_REHYDRATION_SALTS"
          ],
          "stop_assessment": true
        },
        {
          "id": "BR_GREEN_MILD",
          "severity": "GREEN",
          "title": "Mild Respiratory / Hydration Symptoms",
          "message": "No acute emergency red flags were detected. Rest upright, take frequent small sips of water with ORS, and consult a doctor if discomfort persists.",
          "actions": [
            "USE_ORAL_REHYDRATION_SALTS"
          ],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "Never force someone who is struggling to breathe to lie flat on their back.",
        "If the person becomes confused or lips turn gray, call 112 or 108 immediately."
      ]
    },
    "chest_pain": {
      "protocol_id": "chest_pain",
      "protocol_name": "Chest Discomfort & Heart Health",
      "version": "2.1_CALM",
      "trigger_keywords": [
        "chest",
        "heart",
        "chhati",
        "pressure",
        "angina",
        "tightness",
        "seene me dard"
      ],
      "entry_question": "cp_001",
      "questions": [
        {
          "id": "cp_001",
          "text": "First, how is your breathing feeling right now?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "normal",
              "label": "I can breathe normally",
              "next": "cp_002"
            },
            {
              "id": "mild",
              "label": "A little uncomfortable, but I can talk easily",
              "next": "cp_002"
            },
            {
              "id": "struggling",
              "label": "I am struggling to catch my breath or speak in full sentences",
              "next": "CP_RED_CRITICAL"
            }
          ]
        },
        {
          "id": "cp_002",
          "text": "How would you best describe the feeling in your chest?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "pressure",
              "label": "A heavy weight, tightness, or squeezing pressure",
              "next": "cp_003"
            },
            {
              "id": "burning",
              "label": "A burning feeling or acid indigestion",
              "next": "cp_003"
            },
            {
              "id": "sharp",
              "label": "Sharp or stabbing, especially when breathing deeply",
              "next": "cp_004"
            },
            {
              "id": "tender",
              "label": "Tender or sore when I press a specific spot with my finger",
              "next": "cp_005"
            }
          ]
        },
        {
          "id": "cp_003",
          "text": "Does this discomfort spread anywhere else, like your arm, neck, or jaw?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "spreads",
              "label": "Yes, to my left arm, neck, jaw, or upper stomach",
              "next": "cp_006"
            },
            {
              "id": "back",
              "label": "Yes, straight through to my upper back",
              "next": "CP_RED_DISSECTION"
            },
            {
              "id": "no_spread",
              "label": "No, it stays right in the center of my chest",
              "next": "cp_006"
            }
          ]
        },
        {
          "id": "cp_004",
          "text": "Did this pain start suddenly as an intense tearing sensation, or is it more of an ache?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "tearing",
              "label": "Sudden, very sharp tearing pain in the chest or back",
              "next": "CP_RED_DISSECTION"
            },
            {
              "id": "gradual",
              "label": "It built up gradually or feels like a muscle catch",
              "next": "cp_005"
            }
          ]
        },
        {
          "id": "cp_005",
          "text": "If you gently press on your ribs or chest muscle where it hurts, does the pain become sharper?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes, pressing on the spot hurts directly",
              "next": "CP_GREEN_MUSCULOSKELETAL"
            },
            {
              "id": "no",
              "label": "No, pressing doesn't change the feeling",
              "next": "CP_YELLOW_EVALUATE"
            }
          ]
        },
        {
          "id": "cp_006",
          "text": "Are you noticing any other changes, like cold sweating, nausea, or feeling lightheaded?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "sweating_dizzy",
              "label": "Yes, feeling cold sweaty, nauseous, or unusually dizzy",
              "next": "CP_RED_STEMI"
            },
            {
              "id": "none",
              "label": "No, just the chest sensation without sweating or dizziness",
              "next": "CP_RED_ANGINA"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "CP_RED_CRITICAL",
          "severity": "RED",
          "title": "Immediate Medical Support Recommended",
          "message": "Because you are having noticeable difficulty breathing along with chest discomfort, having emergency medical personnel assist you right away is the safest and most supportive step. Sit down comfortably while help is arranged.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "SIT_UPRIGHT_DO_NOT_LIE_FLAT"
          ],
          "stop_assessment": true
        },
        {
          "id": "CP_RED_STEMI",
          "severity": "RED",
          "title": "Prompt Heart Evaluation Advised",
          "message": "The combination of chest pressure with sweating or lightheadedness means your heart should be evaluated by a healthcare professional as soon as possible. Stay calm, rest quietly in a chair, and let an ambulance take you to the clinic.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "DO_NOT_GIVE_ASPIRIN_FOOD_OR_WATER"
          ],
          "stop_assessment": true
        },
        {
          "id": "CP_RED_ANGINA",
          "severity": "RED",
          "title": "Medical Evaluation Needed",
          "message": "Chest tightness or radiating sensations are best checked by a doctor right away to ensure your heart is getting good blood flow. Avoid walking or physical effort right now.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "CP_RED_DISSECTION",
          "severity": "RED",
          "title": "Hospital Check Recommended",
          "message": "Sudden, sharp pain traveling between your shoulder blades warrants a thorough examination at an emergency hospital today to check your circulation.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "CP_YELLOW_EVALUATE",
          "severity": "YELLOW",
          "title": "Same-Day Clinic Checkup Suggested",
          "message": "Your symptoms do not clearly point to a heart attack, but unexplained chest sensations are always worth having reviewed by a general physician or clinic today.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "CP_GREEN_MUSCULOSKELETAL",
          "severity": "GREEN",
          "title": "Likely Muscle or Rib Soreness",
          "message": "Because the discomfort is tender to the touch, it is very likely a mild chest muscle pull or rib cartilage inflammation. No urgent red flags were found. Rest comfortably and observe how you feel.",
          "actions": [],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "If your chest feels heavier, spreads to your neck, or you start breaking out in a sweat, call 112 or 108.",
        "Rest quietly and avoid climbing stairs or exerting yourself while you have chest discomfort."
      ]
    },
    "general": {
      "protocol_id": "general",
      "protocol_name": "General Health Check",
      "version": "2.1_CALM",
      "trigger_keywords": [
        "general",
        "uneasy",
        "fever",
        "sick",
        "bimar",
        "weakness"
      ],
      "entry_question": "gen_001",
      "questions": [
        {
          "id": "gen_001",
          "text": "How is your breathing feeling right now?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "normal",
              "label": "I can breathe comfortably",
              "next": "gen_002"
            },
            {
              "id": "hard",
              "label": "I am struggling noticeably to catch my breath",
              "next": "GEN_RED_RESPIRATORY"
            }
          ]
        },
        {
          "id": "gen_002",
          "text": "Have you noticed any sudden weakness in your face, arm, or trouble speaking clearly?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes, sudden weakness on one side or slurred speech",
              "next": "GEN_RED_NEURO"
            },
            {
              "id": "no",
              "label": "No weakness or speech trouble",
              "next": "gen_003"
            }
          ]
        },
        {
          "id": "gen_003",
          "text": "Do you have any heavy pressure or tightness in your chest?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes, chest pressure",
              "next": "SWITCH_TO_CHEST"
            },
            {
              "id": "no",
              "label": "No chest pressure",
              "next": "gen_004"
            }
          ]
        },
        {
          "id": "gen_004",
          "text": "Do you have a high fever where your neck feels so stiff you cannot touch your chin to your chest?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes, high fever with severe neck stiffness",
              "next": "GEN_RED_SEPSIS"
            },
            {
              "id": "no",
              "label": "No neck stiffness",
              "next": "gen_005"
            }
          ]
        },
        {
          "id": "gen_005",
          "text": "Have you been vomiting so much that you cannot keep water down, or haven't passed urine today?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes, cannot keep fluids down / very dehydrated",
              "next": "GEN_YELLOW_DEHYDRATION"
            },
            {
              "id": "no",
              "label": "No, I can drink fluids and pass urine normally",
              "next": "GEN_GREEN_STABLE"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "GEN_RED_RESPIRATORY",
          "severity": "RED",
          "title": "Breathing Support Recommended",
          "message": "Because catching your breath is difficult, having emergency personnel provide oxygen and check your lungs right away is the safest choice.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "SIT_UPRIGHT_DO_NOT_LIE_FLAT"
          ],
          "stop_assessment": true
        },
        {
          "id": "GEN_RED_NEURO",
          "severity": "RED",
          "title": "Prompt Neurological Review Advised",
          "message": "Sudden one-sided weakness or speech changes should be examined immediately at an emergency hospital to safeguard your brain and nerves.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "DO_NOT_GIVE_ASPIRIN_FOOD_OR_WATER"
          ],
          "stop_assessment": true
        },
        {
          "id": "GEN_RED_SEPSIS",
          "severity": "RED",
          "title": "Hospital Examination Recommended",
          "message": "High fever with neck stiffness is best examined at a hospital clinic today to treat any underlying infection with effective medication.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "GEN_YELLOW_DEHYDRATION",
          "severity": "YELLOW",
          "title": "Hydration Support Needed Today",
          "message": "Difficulty keeping fluids down can quickly deplete your energy. A clinic doctor can give you an IV fluid pouch to get you feeling energized again.",
          "actions": [
            "USE_ORAL_REHYDRATION_SALTS",
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "GEN_GREEN_STABLE",
          "severity": "GREEN",
          "title": "No Immediate Warning Signs",
          "message": "No emergency red flags were found. Rest comfortably, sip warm fluids or water with ORS, and see a routine doctor if you don't feel better soon.",
          "actions": [],
          "stop_assessment": true
        },
        {
          "id": "SWITCH_TO_CHEST",
          "severity": "RED",
          "title": "Checking Chest Symptoms",
          "message": "Rerouting to specialized chest assessment.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": false
        }
      ],
      "safety_net": [
        "If you develop trouble breathing or feel faint, please call 112 or 108.",
        "Drink fluids with electrolytes in small sips throughout the day."
      ]
    },
    "headache": {
      "protocol_id": "headache",
      "protocol_name": "Headache & Neurological Red Flags",
      "version": "2.0_OFFLINE",
      "trigger_keywords": [
        "headache",
        "sar dard",
        "thunderclap",
        "migraine",
        "head pain",
        "temple pain"
      ],
      "entry_question": "ha_001",
      "questions": [
        {
          "id": "ha_001",
          "text": "Did this headache hit you suddenly like a clap of thunder, reaching its worst severity within 1 minute?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Sudden explosive onset in seconds)",
              "next": "HA_RED_THUNDERCLAP"
            },
            {
              "id": "no",
              "label": "No (Built up gradually)",
              "next": "ha_002"
            }
          ]
        },
        {
          "id": "ha_002",
          "text": "Do you have a stiff neck (cannot touch chin to chest), high fever, or sensitivity to light with confusion?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Stiff neck with fever or confusion)",
              "next": "HA_RED_MENINGISM"
            },
            {
              "id": "no",
              "label": "No stiff neck",
              "next": "ha_003"
            }
          ]
        },
        {
          "id": "ha_003",
          "text": "Are you having sudden weakness on one side of your face/body, slurred speech, or vision loss in one eye?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Weakness, slurred speech, vision loss)",
              "next": "HA_RED_NEURO"
            },
            {
              "id": "no",
              "label": "No neurological weakness",
              "next": "ha_004"
            }
          ]
        },
        {
          "id": "ha_004",
          "text": "Did this headache begin right after a recent head injury or impact?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Started after head impact)",
              "next": "HA_YELLOW_TRAUMA"
            },
            {
              "id": "no",
              "label": "No head injury",
              "next": "HA_GREEN_PRIMARY"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "HA_RED_THUNDERCLAP",
          "severity": "RED",
          "title": "Possible Acute Intracranial Emergency",
          "message": "A sudden explosive headache reaching peak severity in seconds warrants immediate hospital CT evaluation to rule out acute vascular bleeding.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "DO_NOT_GIVE_ASPIRIN_FOOD_OR_WATER"
          ],
          "stop_assessment": true
        },
        {
          "id": "HA_RED_MENINGISM",
          "severity": "RED",
          "title": "Meningeal Signs Detected",
          "message": "Headache with neck stiffness and fever requires urgent emergency evaluation for potential central nervous system infection.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "HA_RED_NEURO",
          "severity": "RED",
          "title": "Neurological Deficit Alert",
          "message": "Headache accompanied by facial weakness, speech slurring, or vision loss requires immediate stroke evaluation.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "HA_YELLOW_TRAUMA",
          "severity": "YELLOW",
          "title": "Post-Trauma Evaluation Needed",
          "message": "Headaches following a recent head impact should be examined by a physician today to check for concussion or delayed swelling.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "HA_GREEN_PRIMARY",
          "severity": "GREEN",
          "title": "Typical Primary Headache Pattern",
          "message": "No emergency red flags were detected. Rest in a dark, quiet room, stay hydrated, and consult a doctor if pain persists.",
          "actions": [],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "If your headache explodes suddenly, you develop vomiting, or your speech slurs, call 112 or 108 immediately."
      ]
    },
    "menstrual": {
      "protocol_id": "menstrual",
      "protocol_name": "Menstrual Comfort & Flow Check",
      "version": "2.1_CALM",
      "trigger_keywords": [
        "period",
        "menstrual",
        "bleeding",
        "mahina",
        "clots",
        "cramps",
        "pad"
      ],
      "entry_question": "men_001",
      "questions": [
        {
          "id": "men_001",
          "text": "How would you describe your bleeding flow right now?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "manageable",
              "label": "Normal or slightly heavier than usual, but manageable",
              "next": "men_003"
            },
            {
              "id": "very_heavy",
              "label": "Soaking through 2 or more large pads every hour, for 2 hours in a row",
              "next": "men_002"
            },
            {
              "id": "large_clots",
              "label": "Passing unusually large blood clots (larger than a lemon)",
              "next": "men_002"
            }
          ]
        },
        {
          "id": "men_002",
          "text": "How are your energy levels and balance feeling with this heavy flow?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "dizzy",
              "label": "I feel very weak, pale, or dizzy when I stand up",
              "next": "MEN_RED_HEMORRHAGE"
            },
            {
              "id": "tired_only",
              "label": "Tired or crampy, but I do not feel faint or lightheaded",
              "next": "MEN_YELLOW_HEAVY_BLEEDING"
            }
          ]
        },
        {
          "id": "men_003",
          "text": "How are your cramps or pelvic pain right now?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "normal_cramps",
              "label": "Usual period aches or mild cramping",
              "next": "men_004"
            },
            {
              "id": "severe_pain",
              "label": "Very sharp, sudden, or severe pain on one side of my lower belly",
              "next": "MEN_RED_ACUTE_ABDOMEN"
            }
          ]
        },
        {
          "id": "men_004",
          "text": "Are you experiencing a fever, or any unusual discharge with a strong odor?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes, I have a fever or unusual bad odor",
              "next": "MEN_YELLOW_INFECTION"
            },
            {
              "id": "no",
              "label": "No fever or unusual odor",
              "next": "MEN_GREEN_ROUTINE"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "MEN_RED_HEMORRHAGE",
          "severity": "RED",
          "title": "Medical Care Recommended for Heavy Flow",
          "message": "Because you are losing blood quickly and feeling dizzy, visiting an emergency center or calling for assistance is important to restore your fluids and help you feel better.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "LIE_DOWN_ELEVATE_FEET"
          ],
          "stop_assessment": true
        },
        {
          "id": "MEN_RED_ACUTE_ABDOMEN",
          "severity": "RED",
          "title": "Prompt Pelvic Examination Recommended",
          "message": "Sudden, sharp pain on one side of your lower abdomen is best evaluated by a doctor today to check your ovaries and pelvic area.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "MEN_YELLOW_HEAVY_BLEEDING",
          "severity": "YELLOW",
          "title": "Consult a Gynecologist Today",
          "message": "Your flow is noticeably heavier than usual. A doctor can prescribe medication to slow the bleeding and check your blood count.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "MEN_YELLOW_INFECTION",
          "severity": "YELLOW",
          "title": "Mild Pelvic Checkup Recommended",
          "message": "Having a fever or unusual odor suggests a common pelvic infection that can be cleared up with straightforward antibiotics from a doctor.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "MEN_GREEN_ROUTINE",
          "severity": "GREEN",
          "title": "Normal Cycle Pattern",
          "message": "Your answers indicate typical menstrual symptoms without warning signs. Rest with a warm water bottle, stay hydrated, and rest as needed.",
          "actions": [],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "If bleeding escalates to soaking a fresh pad every 30 to 45 minutes, call 112 or 108.",
        "Lie down and raise your feet on pillows if you feel dizzy."
      ]
    },
    "pregnancy": {
      "protocol_id": "pregnancy",
      "protocol_name": "Pregnancy Care & Symptoms Check",
      "version": "2.1_CALM",
      "trigger_keywords": [
        "pregnant",
        "pregnancy",
        "garbh",
        "baby movement",
        "labor",
        "water broke"
      ],
      "entry_question": "preg_001",
      "questions": [
        {
          "id": "preg_001",
          "text": "Are you currently pregnant or could you be pregnant?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes, I am pregnant",
              "next": "preg_002"
            },
            {
              "id": "not_sure",
              "label": "I might be pregnant (missed period)",
              "next": "preg_002"
            },
            {
              "id": "no",
              "label": "No, I am not pregnant",
              "next": "SWITCH_TO_MENSTRUATION"
            }
          ]
        },
        {
          "id": "preg_002",
          "text": "What is the main thing you are feeling right now?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "sharp_pain",
              "label": "Sharp lower belly pain or shoulder pain",
              "next": "PREG_RED_EMERGENCY"
            },
            {
              "id": "headache_vision",
              "label": "A persistent bad headache or seeing spots/flashes",
              "next": "PREG_RED_PREECLAMPSIA"
            },
            {
              "id": "movement_fluid",
              "label": "Baby's kicks feel much slower, or clear fluid is leaking",
              "next": "PREG_YELLOW_OBSTETRIC"
            },
            {
              "id": "mild_cramps",
              "label": "Mild cramps or slight spotting",
              "next": "PREG_YELLOW_EARLY"
            },
            {
              "id": "routine",
              "label": "Mild morning sickness, tiredness, or normal aches",
              "next": "PREG_GREEN_ROUTINE"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "PREG_RED_EMERGENCY",
          "severity": "RED",
          "title": "Maternity Doctor Evaluation Needed",
          "message": "Sharp lower belly or shoulder pain in early pregnancy is best checked right away with an ultrasound at a hospital to ensure the pregnancy is safely positioned.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "LIE_DOWN_ELEVATE_FEET"
          ],
          "stop_assessment": true
        },
        {
          "id": "PREG_RED_PREECLAMPSIA",
          "severity": "RED",
          "title": "Blood Pressure Check Recommended",
          "message": "A persistent bad headache with visual spots during pregnancy can be related to high blood pressure. Having your pressure checked at a maternity clinic today will keep both you and baby safe.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "PREG_YELLOW_OBSTETRIC",
          "severity": "YELLOW",
          "title": "Check In With Your Labor Unit Today",
          "message": "Noticing changes in your baby's movement or leaking fluid is a good reason to visit your maternity center today for routine monitoring.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "PREG_YELLOW_EARLY",
          "severity": "YELLOW",
          "title": "Clinic Ultrasound Review",
          "message": "Mild spotting or early cramping is common, but having your doctor do a quick scan over the next 24 hours provides peace of mind.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "PREG_GREEN_ROUTINE",
          "severity": "GREEN",
          "title": "Normal Pregnancy Experience",
          "message": "Your symptoms match typical, healthy pregnancy changes. Stay well rested, drink plenty of water, and keep your regular antenatal appointments.",
          "actions": [],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "If you notice sudden heavy bleeding or severe belly pain, head directly to your nearest hospital maternity room.",
        "Trust your instincts\u2014whenever you feel uncertain about your baby's movements, your clinic is always there to check."
      ]
    },
    "stroke": {
      "protocol_id": "stroke",
      "protocol_name": "Stroke & Acute Neurological Red Flags",
      "version": "2.0_OFFLINE",
      "trigger_keywords": [
        "stroke",
        "paralysis",
        "face droop",
        "slurred speech",
        "weak arm",
        "lakwa"
      ],
      "entry_question": "str_001",
      "questions": [
        {
          "id": "str_001",
          "text": "Is there sudden Face drooping (uneven smile), Arm/leg weakness (cannot lift one arm), or Slurred/absent Speech?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (At least one symptom present)",
              "next": "str_002"
            },
            {
              "id": "no",
              "label": "No face droop, arm weakness, or speech slurring",
              "next": "str_003"
            }
          ]
        },
        {
          "id": "str_002",
          "text": "Did these symptoms start or was the person last known to be normal within the last 24 hours?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Within last 24 hours / Just now)",
              "next": "STR_RED_ACUTE_WINDOW"
            },
            {
              "id": "no",
              "label": "No (Started more than 24 hours ago)",
              "next": "STR_RED_COMPLETED"
            }
          ]
        },
        {
          "id": "str_003",
          "text": "Did the person have a sudden weakness or speech slurring that has COMPLETELY resolved and gone back to normal?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes",
              "label": "Yes (Resolved completely within minutes)",
              "next": "STR_YELLOW_TIA"
            },
            {
              "id": "no",
              "label": "No weakness or speech symptoms",
              "next": "STR_GREEN_OBSERVE"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "STR_RED_ACUTE_WINDOW",
          "severity": "RED",
          "title": "Acute Stroke Alert (Time is Brain)",
          "message": "Sudden facial drooping, arm weakness, or speech difficulty is an acute medical emergency. Rapid hospital arrival can reverse brain injury. Call emergency services immediately.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "DO_NOT_GIVE_ASPIRIN_FOOD_OR_WATER"
          ],
          "stop_assessment": true
        },
        {
          "id": "STR_RED_COMPLETED",
          "severity": "RED",
          "title": "Urgent Hospital Stroke Admission Required",
          "message": "Neurological deficits present beyond 24 hours require hospital admission for neuro-imaging, secondary prevention, and specialized care.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "STR_YELLOW_TIA",
          "severity": "YELLOW",
          "title": "Suspected Mini-Stroke (TIA) Alert",
          "message": "Temporary symptoms that resolve quickly still carry a high risk of subsequent stroke. Urgent same-day hospital neurological evaluation is mandatory.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "STR_GREEN_OBSERVE",
          "severity": "GREEN",
          "title": "No Acute Stroke Red Flags",
          "message": "No emergency neurological red flags were detected based on your answers. Continue monitoring and consult a doctor for chronic symptoms.",
          "actions": [],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 112 / 108.",
        "Do not give water or aspirin before brain scan imaging has ruled out bleeding."
      ]
    },
    "unconsciousness_adult": {
      "protocol_id": "unconsciousness_adult",
      "protocol_name": "Fainting & Consciousness Check",
      "version": "2.1_CALM",
      "trigger_keywords": [
        "unconscious",
        "behosh",
        "fainted",
        "seizure",
        "collapsed",
        "blackout",
        "dora"
      ],
      "entry_question": "unc_001",
      "questions": [
        {
          "id": "unc_001",
          "text": "Is the person awake and able to respond to you right now?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes_talking",
              "label": "Yes, they are awake and talking",
              "next": "unc_003"
            },
            {
              "id": "drowsy",
              "label": "They are drowsy or confused, but their eyes are open",
              "next": "unc_004"
            },
            {
              "id": "no_asleep",
              "label": "No, they cannot be woken up at all",
              "next": "unc_002"
            }
          ]
        },
        {
          "id": "unc_002",
          "text": "Watch their chest for 5 seconds. Are they breathing steadily?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "breathing_normal",
              "label": "Yes, their chest is rising and falling steadily",
              "next": "UNC_RED_COMA"
            },
            {
              "id": "breathing_bad",
              "label": "No, they are not breathing or are making gasping sounds",
              "next": "UNC_RED_ARREST"
            }
          ]
        },
        {
          "id": "unc_003",
          "text": "Did they faint briefly, or did they have sudden body shaking or jerking?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "fainted",
              "label": "They fainted for a moment and woke right back up",
              "next": "unc_005"
            },
            {
              "id": "jerking",
              "label": "Their arms or legs were shaking or jerking (a seizure)",
              "next": "UNC_RED_ACTIVE_SEIZURE"
            },
            {
              "id": "just_dizzy",
              "label": "They felt weak or dizzy, but didn't actually lose consciousness",
              "next": "UNC_GREEN_VASOVAGAL"
            }
          ]
        },
        {
          "id": "unc_004",
          "text": "Are they able to tell you their name and where they are?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes_oriented",
              "label": "Yes, they know where they are",
              "next": "unc_005"
            },
            {
              "id": "confused",
              "label": "No, they seem unusually confused, slow, or slurring words",
              "next": "UNC_RED_PERSISTENT_AMS"
            }
          ]
        },
        {
          "id": "unc_005",
          "text": "Before fainting, were they having chest pain, or did they bump their head when they fell?",
          "type": "single_choice",
          "required": true,
          "options": [
            {
              "id": "yes_chest_head",
              "label": "Yes, they had chest discomfort or hit their head",
              "next": "UNC_YELLOW_CARDIAC_SYNCOPE"
            },
            {
              "id": "no_simple",
              "label": "No, it happened after standing up quickly, warm weather, or blood draw",
              "next": "UNC_GREEN_VASOVAGAL"
            }
          ]
        }
      ],
      "results": [
        {
          "id": "UNC_RED_ARREST",
          "severity": "RED",
          "title": "Immediate CPR Needed",
          "message": "The person is not responding and not breathing normally. Call 112 or 108 immediately and begin chest compressions in the center of the chest.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "START_CPR_IMMEDIATELY"
          ],
          "stop_assessment": true
        },
        {
          "id": "UNC_RED_COMA",
          "severity": "RED",
          "title": "Keep Airway Safe & Call Help",
          "message": "The person is sleeping deeply and cannot wake up right now. Gently roll them onto their side (recovery position) so their breathing stays clear, and call for medical transport.",
          "actions": [
            "CALL_112",
            "CALL_108",
            "PLACE_IN_RECOVERY_POSITION",
            "DO_NOT_GIVE_ASPIRIN_FOOD_OR_WATER"
          ],
          "stop_assessment": true
        },
        {
          "id": "UNC_RED_ACTIVE_SEIZURE",
          "severity": "RED",
          "title": "Seizure Care & Medical Support",
          "message": "Stay calm. Place a soft pillow or folded cloth under their head. Do not hold them down, and do not put anything in their mouth. Call emergency services to have them evaluated.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "UNC_RED_PERSISTENT_AMS",
          "severity": "RED",
          "title": "Doctor Evaluation Recommended",
          "message": "Ongoing confusion, memory trouble, or slurred speech after fainting should be evaluated promptly at a hospital to check brain and sugar levels.",
          "actions": [
            "CALL_112",
            "CALL_108"
          ],
          "stop_assessment": true
        },
        {
          "id": "UNC_YELLOW_CARDIAC_SYNCOPE",
          "severity": "YELLOW",
          "title": "Follow-Up Check Today",
          "message": "Because there were chest symptoms or a head impact during the fall, having a doctor examine them today is recommended to be safe.",
          "actions": [
            "VISIT_HEALTHCARE_PROVIDER_TODAY"
          ],
          "stop_assessment": true
        },
        {
          "id": "UNC_GREEN_VASOVAGAL",
          "severity": "GREEN",
          "title": "Likely Mild Fainting Spell",
          "message": "They have recovered well from a brief fainting spell (common from heat, dehydration, or standing up too quickly). Have them rest lying down with feet slightly elevated, and give small sips of water.",
          "actions": [
            "LIE_DOWN_ELEVATE_FEET"
          ],
          "stop_assessment": true
        }
      ],
      "safety_net": [
        "Never place keys, water, or fingers into the mouth of someone who is fainting or having a seizure.",
        "If they feel faint again, have them lie flat on their back immediately."
      ]
    }
  },
  "actions": {
    "CALL_112": {
      "label": "Call National Emergency (112)",
      "intent_uri": "tel:112",
      "network_type": "GSM_VOICE_NO_DATA_REQUIRED",
      "priority": 1,
      "instruction": "Tap to dial 112 immediately. Works on basic cellular signals without internet data."
    },
    "CALL_108": {
      "label": "Call Ambulance Services (108)",
      "intent_uri": "tel:108",
      "network_type": "GSM_VOICE_NO_DATA_REQUIRED",
      "priority": 1,
      "instruction": "Dial 108 for government emergency ambulance transport."
    },
    "START_CPR_IMMEDIATELY": {
      "label": "Begin CPR (Cardiopulmonary Resuscitation)",
      "action_type": "FIRST_AID",
      "priority": 1,
      "instruction": "1. Lay person flat on their back.\n2. Push hard and fast in the center of the chest (100 to 120 beats/minute).\n3. Do not stop until help arrives."
    },
    "PLACE_IN_RECOVERY_POSITION": {
      "label": "Place in Recovery Position",
      "action_type": "FIRST_AID",
      "priority": 2,
      "instruction": "Roll the person onto their side facing you. Tilt their head back slightly so vomit drains away from the windpipe."
    },
    "APPLY_DIRECT_FIRM_PRESSURE": {
      "label": "Apply Direct Firm Pressure",
      "action_type": "FIRST_AID",
      "priority": 1,
      "instruction": "Press down hard on the bleeding wound with a clean cloth, towel, or your hands. Keep continuous pressure without lifting."
    },
    "DO_NOT_GIVE_ASPIRIN_FOOD_OR_WATER": {
      "label": "Nothing By Mouth (NPO)",
      "action_type": "PRECAUTION",
      "priority": 2,
      "instruction": "Do not administer food, water, tea, or blood-thinners. Swallowing reflexes may be lost, creating a choking hazard."
    },
    "SIT_UPRIGHT_DO_NOT_LIE_FLAT": {
      "label": "Sit Upright Immediately",
      "action_type": "FIRST_AID",
      "priority": 2,
      "instruction": "Have the person sit fully upright leaning forward slightly. Lying flat will worsen breathing difficulty."
    },
    "LIE_DOWN_ELEVATE_FEET": {
      "label": "Lie Down & Elevate Feet",
      "action_type": "FIRST_AID",
      "priority": 2,
      "instruction": "Have patient lie flat on their back and elevate legs 30 cm to improve blood circulation to the brain."
    },
    "USE_ORAL_REHYDRATION_SALTS": {
      "label": "Administer Oral Rehydration Solution (ORS)",
      "action_type": "SELF_CARE",
      "priority": 3,
      "instruction": "Mix 1 packet ORS into 1 liter of clean water (or pinch of salt and fist of sugar in clean water). Give frequent small sips."
    },
    "VISIT_HEALTHCARE_PROVIDER_TODAY": {
      "label": "Consult Doctor or Clinic Today",
      "action_type": "CLINICAL_REFERRAL",
      "priority": 3,
      "instruction": "Proceed to the nearest Primary Health Centre (PHC) or clinic within 4 to 6 hours."
    }
  }
};
