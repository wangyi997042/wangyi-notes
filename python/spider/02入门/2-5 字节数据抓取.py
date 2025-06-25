import requests


'''
图片下载示例
'''


# url = "https://www.baidu.com/img/flexible/logo/pc/result.png"  # 示例图片地址，可替换为任意字节资源
# headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
# }

# response = requests.get(url, headers=headers)
# if response.status_code == 200:
#     with open("baidu_logo.png", "wb") as f:
#         f.write(response.content)
#     print("图片已保存为 baidu_logo.png")
# else:
#     print("请求失败，状态码：", response.status_code)


'''
音频下载示例
'''

# url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"  # 示例音频地址，可替换为任意音频资源
# headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
# }
#
# response = requests.get(url, headers=headers)
# if response.status_code == 200:
#     with open("sample_audio.mp3", "wb") as f:
#         f.write(response.content)
#     print("音频已保存为 sample_audio.mp3")
# else:
#     print("请求失败，状态码：", response.status_code)


'''
视频下载示例
'''

video_url = "https://www.w3schools.com/html/mov_bbb.mp4"  # 示例视频地址，可替换为任意视频资源
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}

response = requests.get(video_url, headers=headers)
if response.status_code == 200:
    with open("sample_video.mp4", "wb") as f:
        f.write(response.content)
    print("视频已保存为 sample_video.mp4")
else:
    print("请求失败，状态码：", response.status_code)