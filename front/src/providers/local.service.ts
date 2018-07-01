import {AutoCompleteService} from 'ionic2-auto-complete';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'



@Injectable()
export class Local implements AutoCompleteService {
  sitesNames = ["Atos", "Amadeus", "Polytech"];
  sitesArchitechtures = {  
                          "Atos": {
                                    "floors": ["0", "1", "2"],
                                    "defaultFloor":  "0",
                                    "0": {
                                        "coordinates": {
                                          "type": "FeatureCollection",
                                          "features": [
                                            {
                                              "type": "Feature",
                                              "properties": {},
                                              "geometry": {
                                                "type": "Polygon",
                                                "coordinates": [
                                                  [
                                                    [
                                                      -118.47656249999999,
                                                      61.270232790000634
                                                    ],
                                                    [
                                                      -117.42187500000001,
                                                      56.17002298293205
                                                    ],
                                                    [
                                                      -27.0703125,
                                                      55.57834467218206
                                                    ],
                                                    [
                                                      -26.71875,
                                                      17.644022027872726
                                                    ],
                                                    [
                                                      84.375,
                                                      16.29905101458183
                                                    ],
                                                    [
                                                      84.375,
                                                      23.885837699862005
                                                    ],
                                                    [
                                                      -19.6875,
                                                      25.799891182088334
                                                    ],
                                                    [
                                                      -18.984375,
                                                      60.413852350464914
                                                    ],
                                                    [
                                                      -118.47656249999999,
                                                      61.270232790000634
                                                    ]
                                                  ]
                                                ]
                                              }
                                            },
                                            {
                                              "type": "Feature",
                                              "properties": {},
                                              "geometry": {
                                                "type": "Polygon",
                                                "coordinates": [
                                                  [
                                                    [
                                                      -118.47656249999999,
                                                      61.438767493682825
                                                    ],
                                                    [
                                                      -84.72656249999999,
                                                      61.10078883158897
                                                    ],
                                                    [
                                                      -84.375,
                                                      67.33986082559095
                                                    ],
                                                    [
                                                      -118.47656249999999,
                                                      67.47492238478702
                                                    ],
                                                    [
                                                      -118.47656249999999,
                                                      61.438767493682825
                                                    ]
                                                  ]
                                                ]
                                              }
                                            },
                                            {
                                              "type": "Feature",
                                              "properties": {},
                                              "geometry": {
                                                "type": "Polygon",
                                                "coordinates": [
                                                  [
                                                    [
                                                      -66.4453125,
                                                      60.930432202923335
                                                    ],
                                                    [
                                                      -20.0390625,
                                                      60.413852350464914
                                                    ],
                                                    [
                                                      -20.0390625,
                                                      53.74871079689897
                                                    ],
                                                    [
                                                      -5.9765625,
                                                      53.54030739150022
                                                    ],
                                                    [
                                                      -5.2734375,
                                                      67.33986082559095
                                                    ],
                                                    [
                                                      -66.796875,
                                                      67.7427590666639
                                                    ],
                                                    [
                                                      -66.4453125,
                                                      60.930432202923335
                                                    ]
                                                  ]
                                                ]
                                              }
                                            },
                                            {
                                              "type": "Feature",
                                              "properties": {
                                                "id": "N1"
                                              },
                                              "geometry": {
                                                "type": "Point",
                                                "coordinates": [
                                                  -22.5,
                                                  36.03133177633187
                                                ]
                                              }
                                            },
                                            {
                                              "type": "Feature",
                                              "properties": {
                                                "id": "N1"
                                              },
                                              "geometry": {
                                                "type": "Point",
                                                "coordinates": [
                                                  -54.84375,
                                                  64.16810689799152
                                                ]
                                              }
                                            },
                                            {
                                              "type": "Feature",
                                              "properties": {
                                                "id": "N1"
                                              },
                                              "geometry": {
                                                "type": "Point",
                                                "coordinates": [
                                                  78.046875,
                                                  19.973348786110602
                                                ]
                                              }
                                            }
                                          ]
                                        }
                                    },
                                    "1": {
                                      "coordinates": {
                                        "type": "FeatureCollection",
                                        "features": [
                                          {
                                            "type": "Feature",
                                            "properties": {},
                                            "geometry": {
                                              "type": "Polygon",
                                              "coordinates": [
                                                [
                                                  [
                                                    -118.47656249999999,
                                                    61.270232790000634
                                                  ],
                                                  [
                                                    -117.42187500000001,
                                                    56.17002298293205
                                                  ],
                                                  [
                                                    -27.0703125,
                                                    55.57834467218206
                                                  ],
                                                  [
                                                    -26.71875,
                                                    17.644022027872726
                                                  ],
                                                  [
                                                    84.375,
                                                    16.29905101458183
                                                  ],
                                                  [
                                                    84.375,
                                                    23.885837699862005
                                                  ],
                                                  [
                                                    -19.6875,
                                                    25.799891182088334
                                                  ],
                                                  [
                                                    -18.984375,
                                                    60.413852350464914
                                                  ],
                                                  [
                                                    -118.47656249999999,
                                                    61.270232790000634
                                                  ]
                                                ]
                                              ]
                                            }
                                          },
                                          {
                                            "type": "Feature",
                                            "properties": {},
                                            "geometry": {
                                              "type": "Polygon",
                                              "coordinates": [
                                                [
                                                  [
                                                    -66.4453125,
                                                    60.930432202923335
                                                  ],
                                                  [
                                                    -20.0390625,
                                                    60.413852350464914
                                                  ],
                                                  [
                                                    -20.0390625,
                                                    53.74871079689897
                                                  ],
                                                  [
                                                    -5.9765625,
                                                    53.54030739150022
                                                  ],
                                                  [
                                                    -5.2734375,
                                                    67.33986082559095
                                                  ],
                                                  [
                                                    -66.796875,
                                                    67.7427590666639
                                                  ],
                                                  [
                                                    -66.4453125,
                                                    60.930432202923335
                                                  ]
                                                ]
                                              ]
                                            }
                                          },
                                          {
                                            "type": "Feature",
                                            "properties": {},
                                            "geometry": {
                                              "type": "Point",
                                              "coordinates": [
                                                -22.5,
                                                36.03133177633187
                                              ]
                                            }
                                          }
                                        ]
                                      }
                                       
                                    },
                                    "2": {
                                      "coordinates": {
                                        "type": "FeatureCollection",
                                        "features": [
                                          {
                                            "type": "Feature",
                                            "properties": {},
                                            "geometry": {
                                              "type": "Polygon",
                                              "coordinates": [
                                                [
                                                  [
                                                    -118.47656249999999,
                                                    61.270232790000634
                                                  ],
                                                  [
                                                    -117.42187500000001,
                                                    56.17002298293205
                                                  ],
                                                  [
                                                    -27.0703125,
                                                    55.57834467218206
                                                  ],
                                                  [
                                                    -26.71875,
                                                    17.644022027872726
                                                  ],
                                                  [
                                                    84.375,
                                                    16.29905101458183
                                                  ],
                                                  [
                                                    84.375,
                                                    23.885837699862005
                                                  ],
                                                  [
                                                    -19.6875,
                                                    25.799891182088334
                                                  ],
                                                  [
                                                    -18.984375,
                                                    60.413852350464914
                                                  ],
                                                  [
                                                    -118.47656249999999,
                                                    61.270232790000634
                                                  ]
                                                ]
                                              ]
                                            }
                                          },
                                          {
                                            "type": "Feature",
                                            "properties": {},
                                            "geometry": {
                                              "type": "Point",
                                              "coordinates": [
                                                -22.5,
                                                36.03133177633187
                                              ]
                                            }
                                          }
                                        ]
                                      }
                                    }
                          },
                          "Amadeus": {
                            "floors": ["-1", "0", "1"],
                            "defaultFloor":  "0",
                            "-1": {
                                "coordinates": {
                                  "type": "FeatureCollection",
                                  "features": [
                                    {
                                      "type": "Feature",
                                      "properties": {},
                                      "geometry": {
                                        "type": "Polygon",
                                        "coordinates": [
                                          [
                                            [
                                              -118.47656249999999,
                                              61.270232790000634
                                            ],
                                            [
                                              -117.42187500000001,
                                              56.17002298293205
                                            ],
                                            [
                                              -27.0703125,
                                              55.57834467218206
                                            ],
                                            [
                                              -26.71875,
                                              17.644022027872726
                                            ],
                                            [
                                              84.375,
                                              16.29905101458183
                                            ],
                                            [
                                              84.375,
                                              23.885837699862005
                                            ],
                                            [
                                              -19.6875,
                                              25.799891182088334
                                            ],
                                            [
                                              -18.984375,
                                              60.413852350464914
                                            ],
                                            [
                                              -118.47656249999999,
                                              61.270232790000634
                                            ]
                                          ]
                                        ]
                                      }
                                    },
                                    {
                                      "type": "Feature",
                                      "properties": {},
                                      "geometry": {
                                        "type": "Polygon",
                                        "coordinates": [
                                          [
                                            [
                                              -118.47656249999999,
                                              61.438767493682825
                                            ],
                                            [
                                              -84.72656249999999,
                                              61.10078883158897
                                            ],
                                            [
                                              -84.375,
                                              67.33986082559095
                                            ],
                                            [
                                              -118.47656249999999,
                                              67.47492238478702
                                            ],
                                            [
                                              -118.47656249999999,
                                              61.438767493682825
                                            ]
                                          ]
                                        ]
                                      }
                                    },
                                    {
                                      "type": "Feature",
                                      "properties": {},
                                      "geometry": {
                                        "type": "Polygon",
                                        "coordinates": [
                                          [
                                            [
                                              -66.4453125,
                                              60.930432202923335
                                            ],
                                            [
                                              -20.0390625,
                                              60.413852350464914
                                            ],
                                            [
                                              -20.0390625,
                                              53.74871079689897
                                            ],
                                            [
                                              -5.9765625,
                                              53.54030739150022
                                            ],
                                            [
                                              -5.2734375,
                                              67.33986082559095
                                            ],
                                            [
                                              -66.796875,
                                              67.7427590666639
                                            ],
                                            [
                                              -66.4453125,
                                              60.930432202923335
                                            ]
                                          ]
                                        ]
                                      }
                                    },
                                    {
                                      "type": "Feature",
                                      "properties": {},
                                      "geometry": {
                                        "type": "Point",
                                        "coordinates": [
                                          -22.5,
                                          36.03133177633187
                                        ]
                                      }
                                    }
                                  ]
                                }
                            },
                            "0": {
                              "coordinates": {
                                "type": "FeatureCollection",
                                "features": [
                                  {
                                    "type": "Feature",
                                    "properties": {},
                                    "geometry": {
                                      "type": "Polygon",
                                      "coordinates": [
                                        [
                                          [
                                            -118.47656249999999,
                                            61.270232790000634
                                          ],
                                          [
                                            -117.42187500000001,
                                            56.17002298293205
                                          ],
                                          [
                                            -27.0703125,
                                            55.57834467218206
                                          ],
                                          [
                                            -26.71875,
                                            17.644022027872726
                                          ],
                                          [
                                            84.375,
                                            16.29905101458183
                                          ],
                                          [
                                            84.375,
                                            23.885837699862005
                                          ],
                                          [
                                            -19.6875,
                                            25.799891182088334
                                          ],
                                          [
                                            -18.984375,
                                            60.413852350464914
                                          ],
                                          [
                                            -118.47656249999999,
                                            61.270232790000634
                                          ]
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    "type": "Feature",
                                    "properties": {},
                                    "geometry": {
                                      "type": "Polygon",
                                      "coordinates": [
                                        [
                                          [
                                            -66.4453125,
                                            60.930432202923335
                                          ],
                                          [
                                            -20.0390625,
                                            60.413852350464914
                                          ],
                                          [
                                            -20.0390625,
                                            53.74871079689897
                                          ],
                                          [
                                            -5.9765625,
                                            53.54030739150022
                                          ],
                                          [
                                            -5.2734375,
                                            67.33986082559095
                                          ],
                                          [
                                            -66.796875,
                                            67.7427590666639
                                          ],
                                          [
                                            -66.4453125,
                                            60.930432202923335
                                          ]
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    "type": "Feature",
                                    "properties": {},
                                    "geometry": {
                                      "type": "Point",
                                      "coordinates": [
                                        -22.5,
                                        36.03133177633187
                                      ]
                                    }
                                  }
                                ]
                              }
                               
                            },
                            "1": {
                              "coordinates": {
                                "type": "FeatureCollection",
                                "features": [
                                  {
                                    "type": "Feature",
                                    "properties": {},
                                    "geometry": {
                                      "type": "Polygon",
                                      "coordinates": [
                                        [
                                          [
                                            -118.47656249999999,
                                            61.270232790000634
                                          ],
                                          [
                                            -117.42187500000001,
                                            56.17002298293205
                                          ],
                                          [
                                            -27.0703125,
                                            55.57834467218206
                                          ],
                                          [
                                            -26.71875,
                                            17.644022027872726
                                          ],
                                          [
                                            84.375,
                                            16.29905101458183
                                          ],
                                          [
                                            84.375,
                                            23.885837699862005
                                          ],
                                          [
                                            -19.6875,
                                            25.799891182088334
                                          ],
                                          [
                                            -18.984375,
                                            60.413852350464914
                                          ],
                                          [
                                            -118.47656249999999,
                                            61.270232790000634
                                          ]
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    "type": "Feature",
                                    "properties": {},
                                    "geometry": {
                                      "type": "Point",
                                      "coordinates": [
                                        -22.5,
                                        36.03133177633187
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                  
                          }
                        };
                        
  getResults(keyword:string) {
    let result = [];
    for(let i = 0; i < this.sitesNames.length; i++){
      if(this.sitesNames[i].toLowerCase().indexOf(keyword.toLowerCase()) >= 0){
        result.push(this.sitesNames[i]);
      }
    }
    return result;
  }
  


}