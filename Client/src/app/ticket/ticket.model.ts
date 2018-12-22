export class TicketModel {
    hasVoted: boolean;
    votes: number[] = [];
    voteFinished: boolean;
    name: string;
    yourVote: number;

    public getAverageVote(): number {
        if (this.votes.length == 0) {
            return 0;
        }
        const sum = this.votes.reduce((a, b) => a + b, 0);
        return sum / this.votes.length;
    }
}
