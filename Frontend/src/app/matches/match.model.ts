export class Match {
    public date: string; //cambiar
    public result: string;
    public stadium: string;
    public team1: string;
    public team2: string;
    public event: string;

    constructor(date: string /*cambiar*/, result: string, stadium: string, team1: string, team2: string, event: string) {
        this.date = date;
        this.result = result;
        this.stadium = stadium;
        this.team1 = team1;
        this.team2 = team2;
        this.event = event;
    } 
}