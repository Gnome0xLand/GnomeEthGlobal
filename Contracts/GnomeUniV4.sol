// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {BaseTestHooks} from "./v4-core/src/test/BaseTestHooks.sol";
import {IHooks} from "./v4-core/src/interfaces/IHooks.sol";
import {Hooks} from "./v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "./v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "./v4-core/src/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "./v4-core/src/types/PoolId.sol";
import {BalanceDelta} from "./v4-core/src/types/BalanceDelta.sol";

interface IGNOME {
    function setShieldTimeStamp(uint256 tokenId, uint256 _shieldTimeStamp) external;
    function getID(address gnome) external view returns (uint256);
}

contract GnomeV4Hook is BaseTestHooks {
    using PoolIdLibrary for PoolKey;

    // NOTE: ---------------------------------------------------------
    // state variables should typically be unique to a pool
    // a single hook contract should be able to service multiple pools
    // ---------------------------------------------------------------

    mapping(PoolId => uint256 count) public beforeSwapCount;
    mapping(PoolId => uint256 count) public afterSwapCount;

    mapping(PoolId => uint256 count) public beforeAddLiquidityCount;
    mapping(PoolId => uint256 count) public afterAddLiquidityCount;
    address public GNOME_GAME_ADDRESS;
    IPoolManager public immutable poolManager;
    uint256 liquidityShield = 3 days;

    constructor(IPoolManager _poolManager, address gnomeGame) {
        poolManager = _poolManager;
        Hooks.validateHookPermissions(IHooks(address(this)), getHookPermissions());
        GNOME_GAME_ADDRESS = gnomeGame;
    }

    function getHookPermissions() public pure returns (Hooks.Permissions memory) {
        return
            Hooks.Permissions({
                beforeInitialize: false,
                afterInitialize: false,
                beforeAddLiquidity: true,
                afterAddLiquidity: true,
                beforeRemoveLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: true,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false,
                noOp: false,
                accessLock: false
            });
    }

    // -----------------------------------------------
    // NOTE: see IHooks.sol for function documentation
    // -----------------------------------------------

    function beforeSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata,
        bytes calldata
    ) external override returns (bytes4) {
        beforeSwapCount[key.toId()]++;
        return BaseTestHooks.beforeSwap.selector;
    }

    function afterSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata,
        BalanceDelta,
        bytes calldata
    ) external override returns (bytes4) {
        return BaseTestHooks.afterSwap.selector;
    }

    function beforeAddLiquidity(
        address,
        PoolKey calldata key,
        IPoolManager.ModifyLiquidityParams calldata,
        bytes calldata
    ) external override returns (bytes4) {
        address gnome = abi.decode(hookData, (address));
        uint256 tokenId = IGNOME(GNOME_GAME_ADDRESS).getID(gnome);
        IGNOME(GNOME_GAME_ADDRESS).setShieldTimeStamp(tokenId, block.timestamp + liquidityShield);

        return BaseTestHooks.beforeAddLiquidity.selector;
    }

    function afterAddLiquidity(
        address,
        PoolKey calldata key,
        IPoolManager.ModifyLiquidityParams calldata,
        BalanceDelta,
        bytes calldata
    ) external override returns (bytes4) {
        afterAddLiquidityCount[key.toId()]++;
        return BaseTestHooks.afterAddLiquidity.selector;
    }
}
