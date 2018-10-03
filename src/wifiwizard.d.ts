interface Navigator {
    wifiwizard: WifiWizard
}

interface WifiWizard {

    formatWifiConfig(
        SSID: string,
        password: string,
        algorithm: string
    ): wifiConfig;

    formatWPAConfig(
        SSID: string,
        password: string,
    ): void;

    formatWifiString(
        ssid: string
    ): void;

    addNetwork(
        wifi: object,
        win: () => void,
        fail: () => void
    ): void;

    removeNetwork(
        SSID: string,
        win: () => void,
        fail: () => void
    )

    connectNetwork(
        SSID: string,
        win: () => void,
        fail: () => void
    ): void;

    disconnectNetwork(
        SSID: string,
        win: () => void,
        fail: () => void
    ): void;

    listNetworks(
        win: () => void,
        fail: () => void
    ): void;

    getCurrentSSID(
        win: () => void,
        fail: () => void
    ): void;

    setWifiEnabled(
        enabled: boolean,
        win: () => void,
        fail: () => void
    ): void;

}

interface wifiConfig {

}