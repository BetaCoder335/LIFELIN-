"use strict";

// =========================================================
// LIFELINE CLINICAL TRIAGE PROTOCOLS (OFFLINE-FIRST ENGINE)
// =========================================================
window.LifelineTriageData = {
  "protocols": {
    "chest_pain": {
      "protocol_id": "chest_pain",
      "protocol_name": "Chest Discomfort & Heart Health",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "chest",
        "heart",
        "chhati",
        "pressure",
        "angina",
        "tightness",
        "seena dard",
        "cardiac",
        "palpitations"
      ],
      "questions": [
        {
          "id": "cp_001",
          "text": "How would you describe the chest sensation?",
          "options": [
            {
              "id": "o1",
              "label": "Crushing pressure, heavy weight, or intense tightness in chest",
              "severity": "RED"
            },
            {
              "id": "o2",
              "label": "Sharp or burning pain when breathing deeply or moving",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Mild dull ache, muscle soreness, or fleeting prick",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "cp_002",
          "text": "Does the discomfort spread to other areas of the body?",
          "options": [
            {
              "id": "o4",
              "label": "Spreading to left arm, shoulder, jaw, neck, or upper back",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Spreading to the upper stomach or ribs",
              "severity": "YELLOW"
            },
            {
              "id": "o6",
              "label": "Localized to one single tender spot or no spreading",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "cp_003",
          "text": "Are you experiencing any of these accompanying symptoms?",
          "options": [
            {
              "id": "o7",
              "label": "Shortness of breath, cold clammy sweat, dizziness, or nausea",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Acid reflux, sour belching, or mild fatigue",
              "severity": "YELLOW"
            },
            {
              "id": "o9",
              "label": "No other symptoms, feeling generally stable",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "cp_004",
          "text": "How long has this chest discomfort been present?",
          "options": [
            {
              "id": "o10",
              "label": "Started suddenly and continuous for more than 10-15 minutes",
              "severity": "RED"
            },
            {
              "id": "o11",
              "label": "Comes and goes with exertion, relieved by resting",
              "severity": "YELLOW"
            },
            {
              "id": "o12",
              "label": "Brief moment (seconds) or mild constant soreness for days",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Suspected Acute Coronary Emergency (Heart Attack Alert)",
        "message": "Critical heart emergency signs detected. Immediate ambulance dispatch and hospital emergency department transfer is required.",
        "actions": [
          "CALL_112",
          "REST_DO_NOT_EXERT",
          "LOOSEN_TIGHT_CLOTHING",
          "ASPIRIN_IF_PRESCRIBED"
        ]
      },
      "yellow_result": {
        "title": "Cardiovascular / Thoracic Evaluation Needed Today",
        "message": "Moderate chest discomfort requires professional clinical examination, ECG, and physician consultation within hours.",
        "actions": [
          "VISIT_HEALTHCARE_PROVIDER_TODAY",
          "REST_MONITOR",
          "AVOID_HEAVY_ACTIVITY"
        ]
      },
      "green_result": {
        "title": "Low Urgency Chest Discomfort (Musculoskeletal / Gastric)",
        "message": "Symptoms appear mild and non-critical. Rest comfortably, stay hydrated, and consult a clinic if symptoms persist.",
        "actions": [
          "REST_MONITOR",
          "SIP_WATER",
          "CONSULT_PRIMARY_DOCTOR"
        ]
      }
    },
    "stroke": {
      "protocol_id": "stroke",
      "protocol_name": "Stroke & Neurological Red Flags",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "stroke",
        "lakwa",
        "paralysis",
        "face drooping",
        "slurred speech",
        "weakness",
        "numbness",
        "arm drift",
        "fast"
      ],
      "questions": [
        {
          "id": "st_001",
          "text": "Ask the person to smile broadly. What do you observe?",
          "options": [
            {
              "id": "o1",
              "label": "One side of the face droops or mouth is noticeably crooked",
              "severity": "RED"
            },
            {
              "id": "o2",
              "label": "Slight facial stiffness or numbness on one side",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Both sides of face smile evenly and normally",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "st_002",
          "text": "Ask the person to raise both arms out front with eyes closed for 10 seconds.",
          "options": [
            {
              "id": "o4",
              "label": "One arm drifts downwards or cannot be lifted at all",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Both arms feel heavy or clumsy, but stay raised",
              "severity": "YELLOW"
            },
            {
              "id": "o6",
              "label": "Both arms raise easily and remain steady",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "st_003",
          "text": "Ask the person to repeat: 'The early bird catches the worm'. How do they sound?",
          "options": [
            {
              "id": "o7",
              "label": "Words are slurred, garbled, or completely unable to speak",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Speech is slow, hesitant, or voice is hoarse",
              "severity": "YELLOW"
            },
            {
              "id": "o9",
              "label": "Speech is clear, normal, and easily understood",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "st_004",
          "text": "When did these neurological signs first begin?",
          "options": [
            {
              "id": "o10",
              "label": "Within the last 3 to 4.5 hours (Emergency Golden Window)",
              "severity": "RED"
            },
            {
              "id": "o11",
              "label": "Gradually worsening over the last 12 to 24 hours",
              "severity": "RED"
            },
            {
              "id": "o12",
              "label": "No neurological signs detected",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Acute Stroke Alert (Time-Critical Neurological Emergency)",
        "message": "F.A.S.T. stroke red flags detected. Brain cells lose oxygen rapidly. Call 112/108 immediately and rush to a stroke-ready hospital.",
        "actions": [
          "CALL_112",
          "RECORD_TIME_OF_ONSET",
          "LIE_PATIENT_ON_SIDE",
          "DO_NOT_GIVE_FOOD_OR_WATER"
        ]
      },
      "yellow_result": {
        "title": "Neurological Assessment Recommended",
        "message": "Mild neurological or motor symptoms require thorough evaluation by a physician or neurologist today.",
        "actions": [
          "VISIT_HEALTHCARE_PROVIDER_TODAY",
          "REST_MONITOR",
          "DO_NOT_DRIVE"
        ]
      },
      "green_result": {
        "title": "No Acute Stroke Flags Detected",
        "message": "Facial symmetry, motor arm strength, and speech fluency appear normal. Follow routine medical advice.",
        "actions": [
          "REST_MONITOR",
          "CONSULT_PRIMARY_DOCTOR"
        ]
      }
    },
    "breathing_dehydration": {
      "protocol_id": "breathing_dehydration",
      "protocol_name": "Breathing Distress & Severe Dehydration",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "breath",
        "breathing",
        "saans",
        "asthma",
        "wheezing",
        "suffocating",
        "gasping",
        "dehydration",
        "sunstroke",
        "heat"
      ],
      "questions": [
        {
          "id": "br_001",
          "text": "How is the person's breathing effort and oxygenation?",
          "options": [
            {
              "id": "o1",
              "label": "Severe gasping, unable to speak full words, or blue/gray lips",
              "severity": "RED"
            },
            {
              "id": "o2",
              "label": "Audible wheezing, whistling, or rapid shallow breaths",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Breathing comfortably and able to speak in complete sentences",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "br_002",
          "text": "What is the hydration and fluid retention status?",
          "options": [
            {
              "id": "o4",
              "label": "Unable to keep any water down, vomiting continuously, no urine for 12h+",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Very dry mouth, intense thirst, and dark yellow concentrated urine",
              "severity": "YELLOW"
            },
            {
              "id": "o6",
              "label": "Drinking fluids normally with regular light-colored urination",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "br_003",
          "text": "How is the person's energy level and mental responsiveness?",
          "options": [
            {
              "id": "o7",
              "label": "Confused, extremely lethargic, delirious, or faint upon sitting up",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Fatigued, dizzy when standing quickly, but fully oriented",
              "severity": "YELLOW"
            },
            {
              "id": "o9",
              "label": "Alert, energetic, and answering questions clearly",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "br_004",
          "text": "Did this begin after exposure to extreme heat, an allergen, or infection?",
          "options": [
            {
              "id": "o10",
              "label": "Sudden onset after hot sun exposure, sting, or known asthma attack",
              "severity": "RED"
            },
            {
              "id": "o11",
              "label": "Accompanied by a productive cough or moderate fever for 2-3 days",
              "severity": "YELLOW"
            },
            {
              "id": "o12",
              "label": "Mild symptom without high temperature or allergic trigger",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Severe Respiratory Distress / Dehydration Emergency",
        "message": "Critical breathlessness or hypovolemic dehydration detected. Immediate oxygen therapy or IV fluid rehydration is required.",
        "actions": [
          "CALL_112",
          "SIT_UPRIGHT_DO_NOT_LIE_FLAT",
          "SIP_ORS_IF_CONSCIOUS",
          "KEEP_AIRWAY_OPEN"
        ]
      },
      "yellow_result": {
        "title": "Clinical Rehydration & Respiratory Care Needed",
        "message": "Moderate breathing difficulty or dehydration requires oral rehydration salts (ORS) and clinical evaluation today.",
        "actions": [
          "USE_ORAL_REHYDRATION_SALTS",
          "VISIT_HEALTHCARE_PROVIDER_TODAY",
          "REST_COOL_ENVIRONMENT"
        ]
      },
      "green_result": {
        "title": "Mild Respiratory / Hydration Concern",
        "message": "Breathing is stable and hydration is adequate. Rest, drink clean water with electrolytes, and monitor.",
        "actions": [
          "USE_ORAL_REHYDRATION_SALTS",
          "REST_MONITOR"
        ]
      }
    },
    "bleeding": {
      "protocol_id": "bleeding",
      "protocol_name": "Cuts, Wounds & Bleeding",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "blood",
        "bleeding",
        "khoon",
        "wound",
        "cut",
        "gash",
        "stab",
        "trauma",
        "accident",
        "fracture",
        "injury"
      ],
      "questions": [
        {
          "id": "bld_001",
          "text": "How fast is blood coming from the cut or wound?",
          "options": [
            {
              "id": "o1",
              "label": "Spurting or pouring out rapidly and profusely",
              "severity": "RED"
            },
            {
              "id": "o2",
              "label": "Flowing steadily like a slow tap",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Slow trickle or minor surface ooze",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "bld_002",
          "text": "When you apply firm direct pressure with a clean cloth for 5-10 minutes:",
          "options": [
            {
              "id": "o4",
              "label": "Blood keeps soaking through without slowing down",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Bleeding slows down noticeably but still oozes",
              "severity": "YELLOW"
            },
            {
              "id": "o6",
              "label": "Bleeding stopped completely",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "bld_003",
          "text": "How does the wound appear physically?",
          "options": [
            {
              "id": "o7",
              "label": "Deep, gaping open wider than 1cm, or bone/muscle visible",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Clean cut longer than 2cm requiring professional stitches",
              "severity": "YELLOW"
            },
            {
              "id": "o9",
              "label": "Superficial surface scrape, graze, or shallow scratch",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "bld_004",
          "text": "Is the person experiencing shock symptoms (pale skin, cold sweat, dizziness)?",
          "options": [
            {
              "id": "o10",
              "label": "Very pale, sweating profusely, shivering, or feeling faint",
              "severity": "RED"
            },
            {
              "id": "o11",
              "label": "Slightly dizzy but improving when sitting down",
              "severity": "YELLOW"
            },
            {
              "id": "o12",
              "label": "Feeling calm, alert, and physiologically stable",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Critical Hemorrhage / Deep Trauma Alert",
        "message": "Severe uncontrolled bleeding requires continuous direct pressure and immediate ambulance transport to hospital.",
        "actions": [
          "CALL_112",
          "APPLY_DIRECT_FIRM_PRESSURE",
          "ELEVATE_WOUND_IF_NO_FRACTURE",
          "LIE_DOWN_ELEVATE_FEET"
        ]
      },
      "yellow_result": {
        "title": "Wound Closure / Suture Care Needed Today",
        "message": "The cut is stable but deep enough to require clinical disinfection, stitches/glue, and tetanus booster.",
        "actions": [
          "VISIT_HEALTHCARE_PROVIDER_TODAY",
          "APPLY_DIRECT_FIRM_PRESSURE",
          "DRESS_CLEAN_BANDAGE"
        ]
      },
      "green_result": {
        "title": "Minor Surface Wound (Home First Aid)",
        "message": "Wash with clean tap water and mild soap. Apply antiseptic cream and cover with a sterile bandage.",
        "actions": [
          "DRESS_CLEAN_BANDAGE",
          "REST_MONITOR"
        ]
      }
    },
    "unconsciousness_adult": {
      "protocol_id": "unconsciousness_adult",
      "protocol_name": "Fainting & Consciousness Check",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "unconscious",
        "behosh",
        "faint",
        "fainting",
        "blackout",
        "collapse",
        "seizure",
        "fit",
        "convulsions"
      ],
      "questions": [
        {
          "id": "unc_001",
          "text": "What is the person's current state of responsiveness?",
          "options": [
            {
              "id": "o1",
              "label": "Unresponsive to loud voice and shoulder shaking",
              "severity": "RED"
            },
            {
              "id": "o2",
              "label": "Drowsy, confused, or opens eyes only when spoken to loudly",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Fully awake, alert, and answering questions",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "unc_002",
          "text": "Did the person have rhythmic jerking, stiffening, or convulsions (seizure)?",
          "options": [
            {
              "id": "o4",
              "label": "Yes, active or recent jerking, tongue bite, or stiff posture",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Limp fainting spell lasting under 1 minute, recovered now",
              "severity": "YELLOW"
            },
            {
              "id": "o6",
              "label": "No seizure or fainting; only lightheadedness",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "unc_003",
          "text": "Is the person breathing normally right now?",
          "options": [
            {
              "id": "o7",
              "label": "No breathing or abnormal gasping/snoring sounds (agonal)",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Breathing fast or shallow, but continuous",
              "severity": "YELLOW"
            },
            {
              "id": "o9",
              "label": "Breathing easily, normally, and regularly",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "unc_004",
          "text": "Did the person suffer a head injury or strike the floor during collapse?",
          "options": [
            {
              "id": "o10",
              "label": "Hit head hard, bleeding from scalp, or vomiting after waking",
              "severity": "RED"
            },
            {
              "id": "o11",
              "label": "Minor bump on body, no head impact",
              "severity": "YELLOW"
            },
            {
              "id": "o12",
              "label": "Sat or lay down gently before fainting; no trauma",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Severe Unconsciousness / Airway Emergency",
        "message": "Unresponsiveness, seizure, or abnormal breathing is a critical medical emergency. Call 112/108 immediately.",
        "actions": [
          "CALL_112",
          "RECOVERY_POSITION_IF_BREATHING",
          "START_CPR_IF_NOT_BREATHING",
          "CLEAR_SURROUNDINGS"
        ]
      },
      "yellow_result": {
        "title": "Vasovagal Syncope / Medical Evaluation",
        "message": "Fainting spell recovered. The patient should rest flat with legs elevated and be examined by a doctor today.",
        "actions": [
          "LIE_DOWN_ELEVATE_FEET",
          "SIP_WATER",
          "VISIT_HEALTHCARE_PROVIDER_TODAY"
        ]
      },
      "green_result": {
        "title": "Resolved Lightheadedness (Low Risk)",
        "message": "Consciousness and breathing are normal. Sit quietly, drink cool water, and avoid standing up suddenly.",
        "actions": [
          "SIP_WATER",
          "REST_MONITOR"
        ]
      }
    },
    "headache": {
      "protocol_id": "headache",
      "protocol_name": "Headache & Neurological Red Flags",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "headache",
        "sir dard",
        "migraine",
        "head pain",
        "dizziness",
        "thunderclap"
      ],
      "questions": [
        {
          "id": "ha_001",
          "text": "How rapidly did this headache reach maximum intensity?",
          "options": [
            {
              "id": "o1",
              "label": "Explosive 'thunderclap' peak in seconds (worst headache of life)",
              "severity": "RED"
            },
            {
              "id": "o2",
              "label": "Built up gradually over several hours with throbbing",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Mild constant dull pressure around the forehead/temples",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "ha_002",
          "text": "Are any of these dangerous neurological signs present?",
          "options": [
            {
              "id": "o4",
              "label": "Stiff painful neck with high fever, confusion, or weakness",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Nausea, vomiting, or sensitivity to light and loud sounds",
              "severity": "YELLOW"
            },
            {
              "id": "o6",
              "label": "No neck stiffness, no fever, no weakness",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "ha_003",
          "text": "Is vision or speech affected?",
          "options": [
            {
              "id": "o7",
              "label": "Sudden loss of vision, double vision, or inability to speak",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Temporary visual aura (zigzag lights) preceding migraine",
              "severity": "YELLOW"
            },
            {
              "id": "o9",
              "label": "Vision and speech are completely normal",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "ha_004",
          "text": "Is this a brand new type of headache or a known recurring condition?",
          "options": [
            {
              "id": "o10",
              "label": "First time ever feeling such severe pain (or age over 50)",
              "severity": "RED"
            },
            {
              "id": "o11",
              "label": "Similar to previous recurring migraine attacks",
              "severity": "YELLOW"
            },
            {
              "id": "o12",
              "label": "Typical mild tension headache after screen time or stress",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Dangerous Neurological Headache Alert",
        "message": "Thunderclap onset, neck stiffness with fever, or vision loss requires urgent emergency department neuroimaging (CT/MRI).",
        "actions": [
          "CALL_112",
          "REST_IN_DARK_ROOM",
          "DO_NOT_TAKE_BLOOD_THINNERS",
          "GO_TO_EMERGENCY"
        ]
      },
      "yellow_result": {
        "title": "Migraine / Clinical Headache Evaluation",
        "message": "Symptoms resemble acute migraine or severe tension headache. Rest in a dark quiet room and consult a doctor.",
        "actions": [
          "REST_IN_DARK_ROOM",
          "SIP_WATER",
          "VISIT_HEALTHCARE_PROVIDER_TODAY"
        ]
      },
      "green_result": {
        "title": "Tension / Stress Headache (Mild)",
        "message": "Mild tension discomfort. Hydrate with water, take a screen break, and apply a cool cloth to the forehead.",
        "actions": [
          "REST_MONITOR",
          "SIP_WATER"
        ]
      }
    },
    "pregnancy": {
      "protocol_id": "pregnancy",
      "protocol_name": "Pregnancy Care & Emergency Check",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "pregnant",
        "pregnancy",
        "garbhavati",
        "labor",
        "delivery",
        "contractions",
        "water broke"
      ],
      "questions": [
        {
          "id": "prg_001",
          "text": "What stage of pregnancy is the patient in?",
          "options": [
            {
              "id": "o1",
              "label": "Third trimester (months 7\u20139 / 28+ weeks)",
              "severity": "YELLOW"
            },
            {
              "id": "o2",
              "label": "Second trimester (months 4\u20136 / 13\u201327 weeks)",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "First trimester (months 1\u20133 / 1\u201312 weeks)",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "prg_002",
          "text": "Are any urgent obstetric warning signs present?",
          "options": [
            {
              "id": "o4",
              "label": "Heavy vaginal bleeding, severe constant abdominal pain, or sudden water break",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Severe headache with blurry vision and sudden hand/facial swelling (preeclampsia signs)",
              "severity": "RED"
            },
            {
              "id": "o6",
              "label": "Mild lower back ache or light Braxton-Hicks tightening that stops with rest",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "prg_003",
          "text": "How are the baby's movements (if after 24 weeks)?",
          "options": [
            {
              "id": "o7",
              "label": "Noticeably decreased or no movement felt for several hours",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Normal active kicks, rolls, and movements",
              "severity": "GREEN"
            },
            {
              "id": "o9",
              "label": "Not applicable (early first trimester)",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "prg_004",
          "text": "Are regular contractions occurring?",
          "options": [
            {
              "id": "o10",
              "label": "Strong painful contractions every 3 to 5 minutes",
              "severity": "RED"
            },
            {
              "id": "o11",
              "label": "Irregular mild cramps that ease when lying on left side",
              "severity": "YELLOW"
            },
            {
              "id": "o12",
              "label": "No contractions or labor pains",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Obstetric Emergency Alert (Immediate Hospital Care)",
        "message": "High-risk pregnancy red flags detected. Proceed immediately to the nearest maternity hospital labor room or call 112/108.",
        "actions": [
          "CALL_112",
          "LIE_ON_LEFT_SIDE",
          "GO_TO_MATERNITY_HOSPITAL"
        ]
      },
      "yellow_result": {
        "title": "Obstetrician / Clinic Consultation Advised Today",
        "message": "Moderate pregnancy discomfort. Lie on the left side, hydrate, and have your obstetrician evaluate you today.",
        "actions": [
          "LIE_ON_LEFT_SIDE",
          "SIP_WATER",
          "VISIT_HEALTHCARE_PROVIDER_TODAY"
        ]
      },
      "green_result": {
        "title": "Stable Pregnancy Progress (Routine Care)",
        "message": "No critical obstetric emergency flags detected. Rest comfortably, stay hydrated, and attend regular antenatal checkups.",
        "actions": [
          "REST_MONITOR",
          "SIP_WATER"
        ]
      }
    },
    "menstrual": {
      "protocol_id": "menstrual",
      "protocol_name": "Menstrual Comfort & Flow Check",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "menstrual",
        "period",
        "periods",
        "mahavari",
        "cramps",
        "heavy flow",
        "bleeding"
      ],
      "questions": [
        {
          "id": "men_001",
          "text": "How heavy is the menstrual flow currently?",
          "options": [
            {
              "id": "o1",
              "label": "Soaking through 2+ large sanitary pads/tampons every hour for 2+ hours",
              "severity": "RED"
            },
            {
              "id": "o2",
              "label": "Passing large blood clots (larger than a coin) with heavy flow",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Moderate or light monthly period flow",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "men_002",
          "text": "Is the person experiencing severe dizziness, fainting, or extreme weakness?",
          "options": [
            {
              "id": "o4",
              "label": "Fainted, extremely dizzy when standing, or lips/fingers very pale",
              "severity": "RED"
            },
            {
              "id": "o5",
              "label": "Mild tiredness, sluggishness, or light headache",
              "severity": "YELLOW"
            },
            {
              "id": "o6",
              "label": "Feeling generally well and alert",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "men_003",
          "text": "How severe is the lower abdominal or pelvic cramping pain?",
          "options": [
            {
              "id": "o7",
              "label": "Incapacitating severe sharp pain preventing standing or moving",
              "severity": "RED"
            },
            {
              "id": "o8",
              "label": "Moderate monthly cramps relieved by hot water bag or rest",
              "severity": "YELLOW"
            },
            {
              "id": "o9",
              "label": "Mild discomfort or no cramping",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "men_004",
          "text": "How long has this bleeding episode lasted?",
          "options": [
            {
              "id": "o10",
              "label": "Continuous heavy bleeding for more than 7-8 days",
              "severity": "YELLOW"
            },
            {
              "id": "o11",
              "label": "Within standard 3 to 5 day period cycle",
              "severity": "GREEN"
            },
            {
              "id": "o12",
              "label": "First or second day of regular cycle",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "Severe Menorrhagia / Acute Pelvic Emergency",
        "message": "Extremely heavy blood loss or severe pelvic pain requires urgent gynecological assessment and fluid stabilization.",
        "actions": [
          "CALL_112",
          "LIE_DOWN_ELEVATE_FEET",
          "SIP_ORS_IF_CONSCIOUS",
          "VISIT_EMERGENCY_GYN"
        ]
      },
      "yellow_result": {
        "title": "Gynecological Evaluation Recommended Today",
        "message": "Heavy menstrual bleeding or significant cramps should be evaluated by a healthcare professional or gynecologist.",
        "actions": [
          "VISIT_HEALTHCARE_PROVIDER_TODAY",
          "REST_MONITOR",
          "USE_HOT_WATER_BAG"
        ]
      },
      "green_result": {
        "title": "Normal Menstrual Symptoms (Home Comfort)",
        "message": "Symptoms align with standard menstrual cycle. Use a hot water bottle for comfort, stay hydrated, and rest.",
        "actions": [
          "USE_HOT_WATER_BAG",
          "SIP_WATER",
          "REST_MONITOR"
        ]
      }
    },
    "general": {
      "protocol_id": "general",
      "protocol_name": "General Health Assessment",
      "version": "3.0_OFFLINE",
      "trigger_keywords": [
        "fever",
        "bukhaar",
        "vomit",
        "vomiting",
        "loose motion",
        "diarrhea",
        "nausea",
        "stomach pain",
        "allergy",
        "rash",
        "infection",
        "weakness"
      ],
      "questions": [
        {
          "id": "gen_001",
          "text": "What is the primary physical complaint or symptom?",
          "options": [
            {
              "id": "o1",
              "label": "High fever with chills, body ache, or shivering",
              "severity": "YELLOW"
            },
            {
              "id": "o2",
              "label": "Stomach pain, persistent vomiting, or loose motions",
              "severity": "YELLOW"
            },
            {
              "id": "o3",
              "label": "Skin rash, hives, localized swelling, or itching",
              "severity": "YELLOW"
            },
            {
              "id": "o4",
              "label": "Mild cold, sore throat, or general tiredness",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "gen_002",
          "text": "Are any of these emergency danger signs present?",
          "options": [
            {
              "id": "o5",
              "label": "Difficulty breathing, confusion, chest tightness, or blue lips",
              "severity": "RED"
            },
            {
              "id": "o6",
              "label": "Unable to keep fluids down for 24h, high fever over 103\u00b0F (39.5\u00b0C), or neck stiffness",
              "severity": "RED"
            },
            {
              "id": "o7",
              "label": "Persistent symptoms but able to drink liquids and speak clearly",
              "severity": "YELLOW"
            },
            {
              "id": "o8",
              "label": "None of these severe signs present",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "gen_003",
          "text": "How long have these symptoms been present?",
          "options": [
            {
              "id": "o9",
              "label": "Rapidly worsening in the last few hours",
              "severity": "RED"
            },
            {
              "id": "o10",
              "label": "Present for 1 to 3 days",
              "severity": "YELLOW"
            },
            {
              "id": "o11",
              "label": "Mild symptom starting today or improving",
              "severity": "GREEN"
            }
          ]
        },
        {
          "id": "gen_004",
          "text": "Does the patient belong to a high-risk group (infant, elderly, pregnant, or chronic illness)?",
          "options": [
            {
              "id": "o12",
              "label": "Yes (Infant under 6 months, elderly over 70, or diabetic/heart patient)",
              "severity": "YELLOW"
            },
            {
              "id": "o13",
              "label": "Moderate condition under control",
              "severity": "GREEN"
            },
            {
              "id": "o14",
              "label": "Generally healthy young adult",
              "severity": "GREEN"
            }
          ]
        }
      ],
      "red_result": {
        "title": "High-Priority Medical Emergency Alert",
        "message": "Critical symptoms detected. Immediate clinical assessment and emergency medical care (112 / 108) is advised.",
        "actions": [
          "CALL_112",
          "REST_DO_NOT_EXERT",
          "MONITOR_BREATHING",
          "VISIT_EMERGENCY"
        ]
      },
      "yellow_result": {
        "title": "Clinical Consultation Recommended Today",
        "message": "Moderate illness symptoms detected. Visit a local clinic or Primary Health Centre today for diagnosis and prescription.",
        "actions": [
          "VISIT_HEALTHCARE_PROVIDER_TODAY",
          "USE_ORAL_REHYDRATION_SALTS",
          "REST_MONITOR"
        ]
      },
      "green_result": {
        "title": "Mild Health Symptoms (Home Care & Observation)",
        "message": "Symptoms appear mild and manageable. Rest, drink plenty of fluids, and monitor for any changes.",
        "actions": [
          "REST_MONITOR",
          "SIP_WATER",
          "CONSULT_PRIMARY_DOCTOR"
        ]
      }
    }
  },
  "actions": {
    "CALL_112": {
      "label": "Call 112 / 108 Emergency",
      "action_type": "EMS_DISPATCH",
      "priority": 1,
      "instruction": "Dial 112 or 108 immediately to request an ambulance."
    },
    "REST_DO_NOT_EXERT": {
      "label": "Absolute Rest",
      "action_type": "IMMEDIATE_CARE",
      "priority": 1,
      "instruction": "Sit or recline in a comfortable position. Do not walk, climb stairs, or exert physically."
    },
    "LOOSEN_TIGHT_CLOTHING": {
      "label": "Loosen Clothing",
      "action_type": "IMMEDIATE_CARE",
      "priority": 2,
      "instruction": "Unbutton collar, loosen belt, and ensure open airflow around the patient."
    },
    "ASPIRIN_IF_PRESCRIBED": {
      "label": "Aspirin Guidance",
      "action_type": "MEDICATION_GUIDANCE",
      "priority": 2,
      "instruction": "If prescribed by a physician and not allergic, chew 300mg soluble aspirin."
    },
    "RECORD_TIME_OF_ONSET": {
      "label": "Note Time of First Symptom",
      "action_type": "CLINICAL_TIMING",
      "priority": 1,
      "instruction": "Write down the exact minute symptoms began for the stroke team."
    },
    "LIE_PATIENT_ON_SIDE": {
      "label": "Recovery Position",
      "action_type": "AIRWAY_MANAGEMENT",
      "priority": 1,
      "instruction": "Place patient in recovery position on their side to prevent choking on saliva or vomit."
    },
    "DO_NOT_GIVE_FOOD_OR_WATER": {
      "label": "Nil by Mouth",
      "action_type": "SAFETY_PRECAUTION",
      "priority": 1,
      "instruction": "Do not give any food, water, or medication by mouth as swallowing may be impaired."
    },
    "SIT_UPRIGHT_DO_NOT_LIE_FLAT": {
      "label": "Sit Upright for Breathing",
      "action_type": "RESPIRATORY_SUPPORT",
      "priority": 1,
      "instruction": "Support patient in an upright sitting position. Never force them to lie flat."
    },
    "SIP_ORS_IF_CONSCIOUS": {
      "label": "Oral Rehydration (ORS)",
      "action_type": "HYDRATION",
      "priority": 2,
      "instruction": "Give frequent small sips of Oral Rehydration Solution (ORS) or clean water."
    },
    "KEEP_AIRWAY_OPEN": {
      "label": "Maintain Clear Airway",
      "action_type": "AIRWAY_MANAGEMENT",
      "priority": 1,
      "instruction": "Ensure neck is neutral and airway is clear of any obstruction."
    },
    "APPLY_DIRECT_FIRM_PRESSURE": {
      "label": "Direct Firm Pressure",
      "action_type": "HEMOSTASIS",
      "priority": 1,
      "instruction": "Press firmly on the wound with a clean towel without lifting to check."
    },
    "ELEVATE_WOUND_IF_NO_FRACTURE": {
      "label": "Elevate Injured Limb",
      "action_type": "HEMOSTASIS",
      "priority": 2,
      "instruction": "Raise the bleeding limb above the level of the heart if no bone fracture is suspected."
    },
    "LIE_DOWN_ELEVATE_FEET": {
      "label": "Elevate Legs for Shock",
      "action_type": "SHOCK_MANAGEMENT",
      "priority": 1,
      "instruction": "Lie patient flat and elevate legs 12 inches on pillows to maintain blood flow to brain."
    },
    "DRESS_CLEAN_BANDAGE": {
      "label": "Sterile Dressing",
      "action_type": "WOUND_CARE",
      "priority": 3,
      "instruction": "Cover with a clean sterile dressing or clean cloth to prevent infection."
    },
    "RECOVERY_POSITION_IF_BREATHING": {
      "label": "Recovery Position",
      "action_type": "AIRWAY_MANAGEMENT",
      "priority": 1,
      "instruction": "Turn patient onto their side with upper leg bent to keep airway open."
    },
    "START_CPR_IF_NOT_BREATHING": {
      "label": "CPR (Cardiopulmonary Resuscitation)",
      "action_type": "LIFE_SUPPORT",
      "priority": 1,
      "instruction": "If not breathing, push hard and fast in center of chest at 100-120 beats per minute."
    },
    "CLEAR_SURROUNDINGS": {
      "label": "Clear Sharp Objects",
      "action_type": "SAFETY_PRECAUTION",
      "priority": 1,
      "instruction": "Move hard, hot, or sharp objects away from patient to prevent trauma during seizures."
    },
    "REST_IN_DARK_ROOM": {
      "label": "Dark, Quiet Environment",
      "action_type": "SYMPTOM_RELIEF",
      "priority": 2,
      "instruction": "Rest in a cool, dark, quiet room with minimal screen or sound exposure."
    },
    "DO_NOT_TAKE_BLOOD_THINNERS": {
      "label": "Avoid Blood Thinners",
      "action_type": "SAFETY_PRECAUTION",
      "priority": 1,
      "instruction": "Do not take aspirin or ibuprofen until evaluated by emergency doctor."
    },
    "GO_TO_EMERGENCY": {
      "label": "Emergency Department Transfer",
      "action_type": "HOSPITAL_TRANSFER",
      "priority": 1,
      "instruction": "Proceed immediately to the nearest hospital with 24/7 emergency facilities."
    },
    "LIE_ON_LEFT_SIDE": {
      "label": "Lie on Left Side",
      "action_type": "OBSTETRIC_CARE",
      "priority": 1,
      "instruction": "Lie on the left side to maximize oxygenated blood flow to placenta and baby."
    },
    "GO_TO_MATERNITY_HOSPITAL": {
      "label": "Maternity Labor Ward",
      "action_type": "HOSPITAL_TRANSFER",
      "priority": 1,
      "instruction": "Transfer directly to the nearest maternity hospital labor and delivery department."
    },
    "USE_HOT_WATER_BAG": {
      "label": "Warm Compress",
      "action_type": "SYMPTOM_RELIEF",
      "priority": 3,
      "instruction": "Apply a warm water bag or heating pad to lower abdomen for cramp relief."
    },
    "VISIT_EMERGENCY_GYN": {
      "label": "Urgent Gynecological Care",
      "action_type": "CLINICAL_REFERRAL",
      "priority": 1,
      "instruction": "Seek immediate gynecological evaluation at the nearest health center."
    },
    "VISIT_HEALTHCARE_PROVIDER_TODAY": {
      "label": "Consult Doctor or Clinic Today",
      "action_type": "CLINICAL_REFERRAL",
      "priority": 2,
      "instruction": "Visit a Primary Health Centre (PHC), clinic, or hospital outpatient department today."
    },
    "REST_MONITOR": {
      "label": "Rest & Observation",
      "action_type": "GENERAL_CARE",
      "priority": 3,
      "instruction": "Rest quietly and monitor vital signs for any changes or worsening."
    },
    "SIP_WATER": {
      "label": "Hydrate with Clean Water",
      "action_type": "HYDRATION",
      "priority": 3,
      "instruction": "Drink clean, boiled, or bottled water in small frequent amounts."
    },
    "USE_ORAL_REHYDRATION_SALTS": {
      "label": "Oral Rehydration Salts (ORS)",
      "action_type": "HYDRATION",
      "priority": 2,
      "instruction": "Mix 1 packet ORS in 1 liter clean water. Sip continuously throughout the day."
    },
    "CONSULT_PRIMARY_DOCTOR": {
      "label": "Routine Doctor Checkup",
      "action_type": "GENERAL_CARE",
      "priority": 3,
      "instruction": "Schedule a routine consultation with your family physician if symptoms do not improve."
    },
    "MONITOR_BREATHING": {
      "label": "Monitor Respiration",
      "action_type": "VITAL_CHECK",
      "priority": 1,
      "instruction": "Check breathing rate and ensure airway remains open and unhindered."
    },
    "VISIT_EMERGENCY": {
      "label": "Emergency Room Evaluation",
      "action_type": "EMS_DISPATCH",
      "priority": 1,
      "instruction": "Proceed to the nearest emergency hospital immediately."
    }
  }
};

// =========================================================
// STANDALONE RESILIENT MULTI-STEP TRIAGE CONTROLLER
// =========================================================
window.LifelineTriage = (() => {
    const $ = id => document.getElementById(id);
    const escapeHtml = str => String(str ?? "").replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c]);
    const escapeAttr = str => escapeHtml(str).replace(/`/g, '&#96;');

    const state = {
        type: null, // 'protocol' | 'ai'
        protocolId: null,
        protocolData: null,
        questions: [],
        currentIndex: 0,
        answers: [],
        aiData: null,
        complaint: ""
    };

    function matchKeywordProtocol(complaint) {
        if (!complaint || !window.LifelineTriageData?.protocols) return null;
        const text = complaint.toLowerCase();

        const keywordMap = {
            chest_pain: ["chest", "heart", "angina", "seena", "dard", "cardiac", "palpitation", "left arm", "myocardial", "infarct", "rib", "squeezing chest"],
            stroke: ["stroke", "lakwa", "paralysis", "face droop", "slurred", "speech", "arm weak", "numb", "mouth twist", "fast", "neurolog"],
            breathing_dehydration: ["breath", "saans", "asthma", "wheez", "chok", "suffocat", "gasp", "dehydrat", "thirst", "dry mouth", "sunstroke", "heat stroke", "heat exhaust"],
            bleeding: ["blood", "bleed", "khoon", "cut", "wound", "hemorrhage", "gash", "stab", "trauma", "accident", "fall", "fracture", "broken bone", "open wound", "injury"],
            headache: ["headache", "sir dard", "migraine", "thunderclap", "head pain", "severe head", "vision loss"],
            unconsciousness_adult: ["unconscious", "behosh", "faint", "blackout", "collaps", "passed out", "seizure", "fit", "fits", "convulsion", "epilepsy", "unresponsive"],
            pregnancy: ["pregnant", "pregnancy", "garbhavati", "labor", "delivery", "contraction", "water broke", "spotting", "fetal", "baby moving"],
            menstrual: ["menstru", "period", "mahavari", "heavy flow", "pad soaked", "cramp", "menses"],
            general: ["fever", "bukhaar", "vomit", "ulti", "loose motion", "dast", "diarrhea", "nausea", "stomach", "pet dard", "allergy", "rash", "infection", "weakness"]
        };

        for (const [protoId, kws] of Object.entries(keywordMap)) {
            for (const kw of kws) {
                if (text.includes(kw)) {
                    if (window.LifelineTriageData.protocols[protoId]) return protoId;
                }
            }
        }
        return null;
    }

    async function generateAITriageQuestions(complaint) {
        if (!navigator.onLine) throw new Error("Offline");
        const groqKey = window.LifelineConfig?.GROQ_API_KEY || (window.LifelineConfig?.GROQ_KEY_ENC ? atob(window.LifelineConfig.GROQ_KEY_ENC) : "");
        if (!groqKey) throw new Error("Groq API key not configured");

        const prompt = `You are LIFELINE AI emergency triage assistant for India.
Patient complaint: "${complaint}".
Generate 3 focused, practical triage questions with single-choice options to determine emergency severity (RED: call 112/108, YELLOW: visit clinic today, GREEN: home care).

STRICT JSON OUTPUT ONLY:
{
  "protocol_name": "Clinical Title",
  "questions": [
    {
      "id": "q1",
      "text": "Question evaluating immediate danger signs or severity?",
      "options": [
        {"id": "o1", "label": "Severe danger sign (e.g. trouble breathing, fainting, severe pain)", "severity": "RED"},
        {"id": "o2", "label": "Moderate symptom (e.g. localized discomfort, mild nausea)", "severity": "YELLOW"},
        {"id": "o3", "label": "Mild or no danger signs", "severity": "GREEN"}
      ]
    },
    {
      "id": "q2",
      "text": "Question evaluating symptom duration or progression?",
      "options": [
        {"id": "o4", "label": "Rapidly worsening or spreading", "severity": "RED"},
        {"id": "o5", "label": "Stable or moderate for a few days", "severity": "YELLOW"},
        {"id": "o6", "label": "Mild or already improving", "severity": "GREEN"}
      ]
    },
    {
      "id": "q3",
      "text": "Question evaluating secondary risk factors or patient vulnerability?",
      "options": [
        {"id": "o7", "label": "High risk factor (infant, elderly, severe chronic condition)", "severity": "RED"},
        {"id": "o8", "label": "Moderate risk condition", "severity": "YELLOW"},
        {"id": "o9", "label": "Low risk / otherwise healthy adult", "severity": "GREEN"}
      ]
    }
  ],
  "emergency_first_aid": [
    "Immediate action step 1",
    "Immediate action step 2",
    "Safety precaution"
  ]
}`;

        const models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b", "qwen/qwen3.8-27b"];
        for (const model of models) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2500);

                const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${groqKey}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            { role: "system", content: "You are a clinical triage AI. Output strict valid JSON only, no thoughts, no think tags, no markdown backticks." },
                            { role: "user", content: prompt }
                        ],
                        temperature: 0.1,
                        max_tokens: 1024
                    })
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    let text = data.choices?.[0]?.message?.content || "";
                    text = text.replace(/<think>[\s\S]*?<\/think>/gi, "").replace(/<think>[\s\S]*/gi, "");
                    const jsonMatch = text.match(/\{[\s\S]*\}/);
                    const clean = jsonMatch ? jsonMatch[0] : text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
                    const json = JSON.parse(clean);
                    if (json.questions && json.questions.length) return json;
                }
            } catch (e) {
                console.warn("[LifelineTriage] AI Triage fetch fallback:", e);
            }
        }
        throw new Error("Unable to generate AI questions");
    }

    async function start(complaint = "", protocol = null) {
        complaint = (complaint || "").trim();
        $("triage-start-card")?.classList.add("hidden");
        $("triage-result-card")?.classList.add("hidden");
        $("triage-question-card")?.classList.remove("hidden");

        state.answers = [];
        state.currentIndex = 0;
        state.complaint = complaint;

        let targetProto = protocol;
        if (!targetProto && complaint) {
            targetProto = matchKeywordProtocol(complaint);
        }

        const protocols = window.LifelineTriageData?.protocols || {};

        if (targetProto && protocols[targetProto]) {
            state.type = "protocol";
            state.protocolId = targetProto;
            state.protocolData = protocols[targetProto];
            state.questions = protocols[targetProto].questions || [];
            renderCurrentQuestion();
            return;
        }

        if (complaint && complaint.length > 2 && navigator.onLine) {
            if ($("triage-question-text")) $("triage-question-text").textContent = "Formulating clinical assessment check...";
            if ($("badge-proto-name")) $("badge-proto-name").textContent = "AI Clinical Triage";
            if ($("question-progress")) $("question-progress").textContent = "Preparing...";
            if ($("triage-options-list")) $("triage-options-list").innerHTML = `<div style="padding:25px;text-align:center;color:#666;"><div class="loading-logo" style="margin:0 auto 10px;width:32px;height:32px;line-height:32px;font-size:18px;">+</div>Formulating tailored clinical triage for: <strong>"${escapeHtml(complaint)}"</strong>...</div>`;
            if ($("btn-next-question")) $("btn-next-question").disabled = true;

            try {
                const aiData = await generateAITriageQuestions(complaint);
                state.type = "ai";
                state.aiData = aiData;
                state.questions = aiData.questions || [];
                renderCurrentQuestion();
                return;
            } catch (err) {
                console.warn("[LifelineTriage] Dynamic AI generation failed, falling back to General protocol:", err);
            }
        }

        const generalProto = protocols["general"] || Object.values(protocols)[0];
        state.type = "protocol";
        state.protocolId = generalProto?.protocol_id || "general";
        state.protocolData = generalProto;
        state.questions = generalProto?.questions || [];
        renderCurrentQuestion();
    }

    function renderCurrentQuestion() {
        const questions = state.questions || [];
        const idx = state.currentIndex;

        if (!questions.length || idx >= questions.length) {
            compileAndRenderResult();
            return;
        }

        const q = questions[idx];
        const title = state.type === "protocol" ? (state.protocolData?.protocol_name || "Emergency Triage") : (state.aiData?.protocol_name || "AI Clinical Triage");
        
        if ($("badge-proto-name")) $("badge-proto-name").textContent = title;
        if ($("question-progress")) $("question-progress").textContent = `Question ${idx + 1} of ${questions.length}`;
        if ($("triage-question-text")) $("triage-question-text").textContent = q.text || "";

        const list = $("triage-options-list");
        if (!list) return;
        list.innerHTML = "";

        const existingAnswer = state.answers[idx];

        (q.options || []).forEach((opt, i) => {
            const isSelected = existingAnswer ? (existingAnswer.optionId === opt.id) : (i === 0);
            const label = document.createElement("label");
            label.className = "triage-option" + (isSelected ? " selected" : "");
            label.innerHTML = `<input type="radio" name="triage-opt" value="${escapeAttr(opt.id)}" data-severity="${escapeAttr(opt.severity || 'YELLOW')}" data-label="${escapeAttr(opt.label)}" ${isSelected ? "checked" : ""}><span>${escapeHtml(opt.label)}</span>`;
            
            label.addEventListener("click", () => {
                list.querySelectorAll(".triage-option").forEach(o => o.classList.remove("selected"));
                label.classList.add("selected");
                const radio = label.querySelector("input");
                if (radio) radio.checked = true;
            });

            list.appendChild(label);
        });

        if ($("btn-next-question")) {
            $("btn-next-question").disabled = false;
            const isLast = (idx === questions.length - 1);
            $("btn-next-question").innerHTML = isLast ? `Complete Assessment <span>✓</span>` : `Continue <span>→</span>`;
        }
        if ($("btn-back-question")) $("btn-back-question").disabled = idx === 0;
    }

    function back() {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            state.answers.pop();
            renderCurrentQuestion();
        } else {
            reset();
        }
    }

    function submit() {
        let selected = document.querySelector('input[name="triage-opt"]:checked');
        if (!selected) {
            const first = document.querySelector('input[name="triage-opt"]');
            if (first) { first.checked = true; selected = first; }
        }
        if (!selected) return;

        const currentQ = state.questions[state.currentIndex];
        const severity = selected.dataset?.severity || "YELLOW";
        const label = selected.dataset?.label || selected.value;

        state.answers[state.currentIndex] = {
            questionId: currentQ?.id || `q_${state.currentIndex}`,
            questionText: currentQ?.text || "",
            optionId: selected.value,
            optionLabel: label,
            severity: severity
        };

        state.currentIndex++;
        if (state.currentIndex >= state.questions.length) {
            compileAndRenderResult();
        } else {
            renderCurrentQuestion();
        }
    }

    function compileAndRenderResult() {
        const allActions = window.LifelineTriageData?.actions || {};
        const answers = state.answers || [];
        const hasRed = answers.some(a => a.severity === "RED");
        const hasYellow = answers.some(a => a.severity === "YELLOW");

        const severity = hasRed ? "RED" : (hasYellow ? "YELLOW" : "GREEN");
        const proto = state.protocolData;

        let resultObj = null;
        if (state.type === "protocol" && proto) {
            resultObj = severity === "RED" ? proto.red_result : (severity === "YELLOW" ? proto.yellow_result : proto.green_result);
        }

        const defaultTitle = state.type === "protocol" ? `${proto?.protocol_name || "Emergency"} Assessment` : (state.aiData?.protocol_name || `${state.complaint || "Clinical"} Assessment`);
        const title = resultObj?.title || defaultTitle;

        let message = resultObj?.message;
        if (!message) {
            message = severity === "RED" ?
                "High-urgency emergency indicators detected. Immediate professional medical care and ambulance dispatch (112 / 108) is strongly advised." :
                (severity === "YELLOW" ? "Moderate clinical concern. The patient should be evaluated by a healthcare professional today." : "Symptoms appear mild and stable. Follow basic home care precautions.");
        }

        const actions = [];
        if (resultObj?.actions) {
            resultObj.actions.forEach(actId => {
                const actData = allActions[actId] || {};
                actions.push({
                    id: actId,
                    label: actData.label || actId.replace(/_/g, " "),
                    instruction: actData.instruction || "Follow standard medical precautions."
                });
            });
        } else {
            if (severity === "RED") {
                actions.push({ label: "Call Emergency 112 / 108", instruction: "Dial 112 or 108 immediately to request an ambulance." });
                actions.push({ label: "Keep Patient Still & Calm", instruction: "Rest in a comfortable position, loosen tight clothing, do not exert." });
            } else if (severity === "YELLOW") {
                actions.push({ label: "Consult Healthcare Provider", instruction: "Visit a local clinic or consult a physician today for a physical examination." });
            } else {
                actions.push({ label: "Home Observation", instruction: "Rest quietly, stay hydrated with clean water, and monitor for changes." });
            }

            (state.aiData?.emergency_first_aid || []).forEach(aid => {
                actions.push({ label: "First-Aid Guidance", instruction: aid });
            });
        }

        const symptomSummary = answers.map(a => a.optionLabel).join(", ");
        const verbalScript = severity === "RED" ?
            `I need an ambulance immediately for ${title.toLowerCase()}. Reported symptoms: ${symptomSummary}. Patient is in need of emergency stabilization.` :
            `Patient presenting with ${title.toLowerCase()}. Symptoms: ${symptomSummary}. Clinically stable for evaluation.`;

        renderResultCard({
            title: title,
            severity: severity,
            message: message,
            actions: actions,
            verbal_script: { script: verbalScript }
        });
    }

    function renderResultCard(result) {
        $("triage-question-card")?.classList.add("hidden");
        $("triage-result-card")?.classList.remove("hidden");

        if ($("result-title")) $("result-title").textContent = result.title || "Assessment Complete";
        if ($("result-message")) $("result-message").textContent = result.message || "";

        const severity = String(result.severity || "").toLowerCase();
        const banner = $("result-status-banner");
        if (banner) {
            if (severity === "red") {
                banner.style.background = "#fff0f1";
                banner.style.color = "#c53d3d";
                banner.style.border = "1px solid #f8d7da";
            } else if (severity === "yellow" || severity === "orange") {
                banner.style.background = "#fff7e8";
                banner.style.color = "#cf6a23";
                banner.style.border = "1px solid #ffeeba";
            } else {
                banner.style.background = "#e8f8ef";
                banner.style.color = "#0a8f55";
                banner.style.border = "1px solid #d4edda";
            }
        }

        if ($("result-urgency")) $("result-urgency").textContent = `${result.severity || "INFO"} PRIORITY`;

        const script = result.verbal_script?.script || result.message || "";
        if ($("txt-dispatch-verbal")) $("txt-dispatch-verbal").textContent = `“${script}”`;

        const list = $("result-actions-list");
        if (list) {
            list.innerHTML = "";
            (result.actions || []).forEach(action => {
                const el = document.createElement("div");
                el.className = "result-action";
                const label = action.label ? `<strong>${escapeHtml(action.label)}</strong>: ` : "";
                const instruction = escapeHtml(action.instruction || action.text || String(action));
                el.innerHTML = `${label}${instruction}`;
                list.appendChild(el);
            });
        }

        const message = `LIFELINE SOS: I need urgent medical help! Condition: ${result?.title || 'Emergency'}. Please call 112/108.`;
        if ($("btn-send-sms-sos")) {
            $("btn-send-sms-sos").href = `sms:112?body=${encodeURIComponent(message)}`;
        }
    }

    function reset() {
        state.answers = [];
        state.currentIndex = 0;
        state.questions = [];
        $("triage-result-card")?.classList.add("hidden");
        $("triage-question-card")?.classList.add("hidden");
        $("triage-start-card")?.classList.remove("hidden");
        if ($("input-complaint")) $("input-complaint").value = "";
    }

    // Auto-bind when DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".protocol").forEach(button => {
            button.addEventListener("click", () => start("", button.dataset.proto));
        });
        $("btn-start-triage")?.addEventListener("click", () => start($("input-complaint")?.value.trim()));
        $("btn-next-question")?.addEventListener("click", submit);
        $("btn-back-question")?.addEventListener("click", back);
        $("btn-reset-triage")?.addEventListener("click", reset);
    });

    return {
        start,
        submit,
        back,
        reset
    };
})();
