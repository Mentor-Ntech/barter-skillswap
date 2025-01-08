// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Escrow {
    struct EscrowAgreement {
        uint256 id;
        uint256 agreementId;
        address depositor;
        uint256 amount;
        uint8 status; // 0: active, 1: released, 2: reverted 
    }

    mapping(uint256 => EscrowAgreement) public escrows;
    uint256 public escrowCounter;

    event EscrowCreated(uint256 id, uint256 agreementId, uint256 amount);
    event EscrowReleased(uint256 id);
    event EscrowReverted(uint256 id);

    function createEscrow(uint256 _agreementId, uint256 _amount) public payable {
        require(msg.value == _amount, "Incorrect deposit amount");
        escrows[escrowCounter] = EscrowAgreement(
            escrowCounter,
            _agreementId,
            msg.sender,
            _amount,
            0
        );
        emit EscrowCreated(escrowCounter, _agreementId, _amount);
        escrowCounter++;
    }

    function releaseEscrow(uint256 _escrowId) public {
        EscrowAgreement storage escrow = escrows[_escrowId];
        require(escrow.status == 0, "Escrow not active");

        payable(escrow.depositor).transfer(escrow.amount);
        escrow.status = 1;
        emit EscrowReleased(_escrowId);
    }

    function revertEscrow(uint256 _escrowId) public {
        EscrowAgreement storage escrow = escrows[_escrowId];
        require(escrow.status == 0, "Escrow not active");

        escrow.status = 2;
        emit EscrowReverted(_escrowId);
    }
}