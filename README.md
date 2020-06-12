# CodeExerciseRingCentral

Routes:
POST /recordings   - creates the new recording

PATCH /recordings/:id  - allows for the update of the robocallIndicator field


GET /recordings  - provides all recordings with the ability to provide query params to match on
handles paging utlizing parameters `limit` and 'page'. 

Sample:
`GET /recordings?name=callTwo`

`{
    "recordings": [
        {
            "robocallIndicator": false,
            "_id": "5ee3ab59231ff82534a35250",
            "name": "callTwo",
            "__v": 0,
            "timeStamp": "2020-06-12T19:19:49.346Z"
        }
    ],
    "totalRecords": 1,
    "recordsPerPage": 10,
    "page": 1,
    "totalPages": 1
}`



Stretch Goal:
To secure the API , as a non organziational user, the most straightforward way might be issuing API Keys.  
This would have some overhead and maintainence, but probably not as complex as implementing Oath2.  It gives
the ability to track which users might be problematic or abusive.  And if their keys are compromised allows for quick
revocation to prevent further abuses or information compromises.
