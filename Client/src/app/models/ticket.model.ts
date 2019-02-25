export class TicketModel {
    constructor(public name: string, public color: string) {}
    hasVoted: boolean;
    votes: number[] = [];
    voteFinished: boolean;
    yourVote: number;

    get nonNullVotes(): number[] {
        return this.votes.filter(v => v !== null);
    }

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
        if (this.nonNullVotes.length == 0) {
            return 0;
        }
        const sum = this.nonNullVotes.reduce((a, b) => a + b, 0);
        return sum / this.nonNullVotes.length;
    }

    public getSortedVote(): number[] {
        return this.nonNullVotes.slice().sort((a, b) => a - b);
    }
}
