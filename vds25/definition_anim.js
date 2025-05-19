{
  "setup": [
    {
      "element": ".label_box",
      "modifier": "function() { var clone = this.node.cloneNode(true); clone.setAttribute('id', 'cloned'); this.node.parentElement.appendChild(clone); }"
    }
  ],
  "animation": [
    [],
    [
      {
        "element": ".linpt",
        "modifier": "attr",
        "duration": 200,
        "parameters": [ { "opacity": "1" }]
      }
    ],
    [
      {
        "element": "#label_push_b",
        "modifier": "attr",
        "parameters": [ { "x": "200", "y": "600", "width": "200" } ]
      },
      {
        "element": "#label_push_a",
        "modifier": "attr",
        "parameters": [ { "x": "400", "y": "600", "width": "200" } ]
      },
      {
        "element": "#label_pop_a",
        "modifier": "attr",
        "parameters": [ { "x": "600", "y": "600", "width": "200" } ]
      },
      {
        "element": "#label_push_c",
        "modifier": "attr",
        "parameters": [ { "x": "800", "y": "600", "width": "200" } ]
      },
      {
        "element": "#label_push_d",
        "modifier": "attr",
        "parameters": [ { "x": "1000", "y": "600", "width": "200" } ]
      },
      {
        "element": "#label_pop_d",
        "modifier": "attr",
        "parameters": [ { "x": "1200", "y": "600", "width": "200" } ]
      },
      {
        "element": "#label_pop_c",
        "modifier": "attr",
        "parameters": [ { "x": "1400", "y": "600", "width": "200" } ]
      },
      {
        "element": "#label_pop_b",
        "modifier": "attr",
        "parameters": [ { "x": "1600", "y": "600", "width": "200" } ]
      }
    ]
  ]
}
