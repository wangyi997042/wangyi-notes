

import requests

if __name__ == '__main__':
    url = 'http://www.baidu.com'

    headers = {
      "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
    }

    response_ = requests.get(url, headers=headers)
    # print(response_.text)

    str_data = response_.content.decode('utf-8')

    print(str_data)

