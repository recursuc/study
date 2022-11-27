# Python program for KMP Algorithm 
def KMPSearch(pat, txt): 
    M = len(pat) 
    N = len(txt) 
  
    lps = [0]*M # longest prefix suffix values for pattern 
    j = 0 # index for pat[] 
  
    computeLPS(pat, M, lps) 
  
    i = 0 
    while i < N: 
        if pat[j] == txt[i]: 
            i += 1
            j += 1
  
            if j == M: 
                print("Found pattern at index " + str(i-j))
                j = lps[j-1] 
        else: 
            if j != 0: 
                j = lps[j-1] 
            else: 
                i += 1
 
def computeLPS(pat, M, lps): 
    len = 0 #前一个最长真前缀和后缀的长度
    i = 1
    # 已知lps(pat[0:i-1]) = len, 即串pat[0:len-1]
    while i < M: 
        if pat[i] == pat[len]: 
            len += 1
            lps[i] = len
            i += 1
        else: 
            if len != 0: 
                len = lps[len-1] 
            else: 
                lps[i] = 0
                i += 1
  
txt = "ABABDABACDABABCABAB"
pat = "ABABCABAB"
KMPSearch(pat, txt)