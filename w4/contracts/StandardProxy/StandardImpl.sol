// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract StandardImpl {
    // uint256 public constant VERSION = 1;
    uint256 public constant VERSION = 4;

    bool public initialized;

    uint256 public value;

    uint256 public value02;

    modifier initializer() {
        require(!initialized, "Only initialize once");
        _;
        initialized = true;
    }

    function initialize(uint256 _initValue) public initializer {
        value = _initValue;
    }

    function setValue(uint256 _newValue) public {
        //value = _newValue + 10;
        value = _newValue + 20;
    }

    function setValue02(uint256 _newValue) public {
        //value = _newValue + 10;
        value02 = _newValue + 200;
    }
}
