export function longestCommonSubstring(str1: string, str2: string): string {
    if (!str1 || !str2) return '';

    const len1 = str1.length;
    const len2 = str2.length;
    let maxLen = 0;
    let endPos = 0;

    // 创建二维数组并初始化为0
    const dp: number[][] = Array(len1 + 1);
    for (let i = 0; i <= len1; i++) {
        dp[i] = Array(len2 + 1).fill(0);
    }

    // 动态规划计算最长公共子串
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endPos = i; // 记录在str1中的结束位置
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // 提取最长子串
    if (maxLen === 0) return '';
    return str1.substring(endPos - maxLen, endPos);
}