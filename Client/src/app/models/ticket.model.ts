export class TicketModel {
    constructor(public name: string) {}
    hasVoted: boolean;
    votes: number[] = [];
    voteFinished: boolean;
    yourVote: number;

    public voteByOther(vote: number, numberOfPeople: number) {
        this.votes.push(vote);
        this.checkIfVoteFinished(numberOfPeople);
    }

    public checkIfVoteFinished(numberOfPeople: number) {
        if (this.votes.length === numberOfPeople) {
            this.voteFinished = true;
        }
    }

    public voteByMe(vote: number, numberOfPeople: number) {
        this.voteByOther(vote, numberOfPeople);
        this.yourVote = vote;
        this.hasVoted = true;
    }

    public getAverageVote(): number {
        if (this.votes.length == 0) {
            return 0;
        }
        const sum = this.votes.reduce((a, b) => a + b, 0);
        return sum / this.votes.length;
    }
}
