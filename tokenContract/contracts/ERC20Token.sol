// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ZenithToken {
    // << CUSTOM ERRORS >>
    error ApproveError_InvalidAddress();
    error MintError_InvalidAddress();
    error TransferError_InvalidAddress();
    error TransferError_InsufficientBalance();

    // << VARIABLE >>

    // Name of Token
    string public name;

    // Symbol of Token
    string public symbol;

    // Decimal Value of Token
    uint8 public immutable decimals;

    // Total Supply of Token
    uint256 private _totalSupply;

    // << MAPPING >>

    // mapping for update the user balance with its address
    mapping(address => uint256) private _balances;

    // mapping for update the the allowance set by the holder
    mapping(address => mapping(address => uint256)) private _allowances;

    // << EVENTS >>

    // This event is emit when token is transferred
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This event is emit when token is approved by the holder
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    // << CONSTRUCTOR >>

    // This function is mint token with initial supply and initialize name, symbol and decimals of token
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        _mint(msg.sender, initialSupply * uint256(10) ** _decimals);
    }

    // << FUNCTIONS >>

    // << PRIVATE FUNCTIONS >>

    // Function that MINT Tokens
    function _mint(address account, uint256 value) private {
        // if contract deployment account is "0x0" then mint function is getting revert
        if (account == address(0)) revert MintError_InvalidAddress();

        // update the supply and balance states
        _totalSupply += value;
        _balances[account] += value;

        emit Transfer(address(0), account, value);
    }

    // Internal Transfer Token Function
    function _transfer(address from, address to, uint256 value) private {
        // Validations
        if (from == address(0)) revert TransferError_InvalidAddress();
        if (to == address(0)) revert TransferError_InvalidAddress();
        if (_balances[from] < value) revert TransferError_InsufficientBalance();

        // Update the Balance
        _balances[from] -= value;
        _balances[to] += value;

        emit Transfer(from, to, value);
    }

    // Internal Approve Token Function
    function _approve(address owner, address spender, uint256 value) private {
        if (owner == address(0)) revert ApproveError_InvalidAddress();
        if (spender == address(0)) revert ApproveError_InvalidAddress();

        _allowances[owner][spender] = value;

        emit Approval(owner, spender, value);
    }

    // << External Functions >>

    // Return total supply of token
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    // Return balance of any address
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    // Transfer Tokens from one account to another
    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    // Return the value of set allownace
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    // Token owner approves the amount of token to another address
    function approve(address spender, uint256 value) external returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    // transfer token from the spender account to other account
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool) {
        _transfer(from, to, value);
        _approve(from, msg.sender, _allowances[from][msg.sender] - value);
        return true;
    }
}
