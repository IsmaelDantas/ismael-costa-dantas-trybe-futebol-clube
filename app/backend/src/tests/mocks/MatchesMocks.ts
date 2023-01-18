// exportando a mock MatchesMock
export const MatchesMocks = [
    {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamName": {
            "teamName": "Gremio",
        },
        "teamAway": {
            "teamName": "São Paulo",
        }
    },
    {
        "id": 28,
        "homeTeam": 16,
        "homeTeamGoals": 3,
        "awayTeam": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamName": {
            "teamName": "Palmeiras",
        },
        "teamAway": {
            "teamName": "Santos",
        }
    }
];

// exportando a mock MatchesMocksUp
export const MatchesMocksUp = [
    {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
    },
    {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
    }
];