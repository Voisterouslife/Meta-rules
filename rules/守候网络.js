// 程序入口
function main(config) {
    if (config.proxies) {
        addProxyGroup(config);  // 添加代理组
        CustomRules(config);    // 应用自定义规则
    }
    return config;
}

// 添加代理组到配置中
function addProxyGroup(config) {
    const proxies = config.proxies.map(proxy => proxy.name); // 提取代理名称
    const newGroup = {
        name: "游戏代理",
        type: "select",
        proxies: proxies.length ? proxies : ["DIRECT"] // 如果有代理则使用，否则使用 "DIRECT"
    };
    
    // 如果 proxy-groups 不存在，则初始化为空数组
    config["proxy-groups"] = config["proxy-groups"] || [];
    
    // 将新代理组插入到代理组列表的第二位，如果列表为空则直接添加
    if (config["proxy-groups"].length) {
        config["proxy-groups"].splice(1, 0, newGroup);
    } else {
        config["proxy-groups"].push(newGroup);
    }
}

// 应用自定义规则到配置中
function CustomRules(config) {
    const rules = [
        'DOMAIN-KEYWORD,bing,🇭🇰 HK-S2 Nearoute',
        'DOMAIN-KEYWORD,openai,🇭🇰 HK-S2 Nearoute',
        'DOMAIN-KEYWORD,steam,🇭🇰 HK-S1 Hala 0.2x',
        'DOMAIN-KEYWORD,epicgames,DIRECT',
        'DOMAIN-KEYWORD,tencent,DIRECT',
        'DOMAIN-KEYWORD,qq,DIRECT',
        'DOMAIN-KEYWORD,bili,DIRECT',
        'DOMAIN-KEYWORD,ubi,DIRECT',
        'DOMAIN-KEYWORD,baidu,DIRECT',
        'DOMAIN-KEYWORD,bkssl,DIRECT',
        'PROCESS-NAME,Game.exe,游戏代理',
        'PROCESS-NAME,Backrooms-Win64-Shipping.exe,DIRECT',
        'PROCESS-NAME,electron.exe,🇺🇸 US-E1 EMBY Shark 0.01x',
        'PROCESS-NAME,Lethal Company.exe,DIRECT',
        'PROCESS-NAME,Onedrive.exe,🇭🇰 HK-S1 Hala 0.2x'
    ];

    // 将自定义规则添加到现有规则之前
    config["rules"] = [...rules, ...(config["rules"] || [])];
}
