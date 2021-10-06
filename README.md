
# Cài đặt
## Frontend

1. Thư viện sử dụng để kết nối tới keycloak: [keycloak-js](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter) và [@react-keycloak/web](https://www.npmjs.com/package/@react-keycloak/web).
2. Đăng nhập vào keycloak admin console theo đường dẫn: `https://{domain}/auth/admin/vbee-holding/console` với tài khoản được cấp.
3. Khi đăng nhập vào thì chọn client cho frontend cần cài đặt như hình:
![client-keycloak](https://i.ibb.co/KGM930T/Screenshot-from-2021-10-05-14-35-45.png)
4. sau đó chọn tab `installation` > chọn format option là `OIDC Keylcoak Json`.
5. Copy nội dung vào file `keycloak.json` được đặt trong folder `public` của project react. Nội dung có dạng:
```php 
{
  "realm": "myRealm",
  "auth-server-url": "domain auth",
  "ssl-required": "external",
  "resource": "frontend-1",
  "public-client": true,
  "confidential-port": 0
}
```
6. Các trường lưu ý khi cài đặt
![client-setting](https://i.ibb.co/spSHdyD/client-setting.png)
* Consent Required: Hiển thị một trang hỏi người dùng có đồng ý với các chính sách của ứng dụng (để off)
* Login Theme: Lựa chọn chủ đề đăng nhập cho client của bạn
* Client-Protocol: Lựa chọn giao thức xác thực (luôn chọn Openid-connect)
* Access Type: Kiểu truy cập cho client. Có 3 kiểu
  - `Public:` Dành cho client-side clients, không có cơ chế bảo mật với token hay secret client mà được giới hạn truy cập dựa vào redirect_uri. (Sử dụng cho các client chạy frontend).
  - `Credential:` Dành cho server-side clients, sử dụng secret client để yêu cầu đăng nhập hoặc lấy access_token trực tiếp từ Keycloak server (Sử dụng cho các client chạy backend).
  - `Bearer only:` Ứng dụng sẽ chỉ cho phép các requests có dạng xác thực là bearer token, ứng dụng không có chế độ đăng nhập. (Gần như không sử dụng)
* Standard Flow Enabled: luồng authentication này sẽ có sử dụng refresh token.
* Implicit Flow Enabled: luồng authentication này không sinh ra refresh token.
* Direct Access Grants Enabled: cho phép truy cập trực tiếp qua secret client, không cần đăng nhập.
* Redirect URLs: Các url chuyển hướng về ứng dụng khi đăng nhập (nên để  ở dạng `{domain}/*`).
* Backchannel Logout URL: URL sẽ nhận sự kiện logout sau khi người dùng đăng xuất.


  

## Backend

1. Thư viện sử dụng để kết nối tới keycloak: keycloak-connect-cache (bản gốc là keycloak-connect nhưng không có cache). Đọc thêm thông tin ở [đây](https://www.keycloak.org/docs/latest/securing_apps/index.html#_nodejs_adapter).
2.  Các bước lấy nội dung json tương tự với frontend, có nội dung dưới đây:
```php 
 {
  "realm": "vbee-holding",
  "auth-server-url": "{domain}/auth/",
  "ssl-required": "none",
  "resource": "service1", // Tên client
  "verify-token-audience": true,
  "credentials": {
    "secret": "4b45de4b-e45b-4807-b717-8fa5c66e0d4e"
  },
  "confidential-port": 0,
  "policy-enforcer": {
    "path-cache": {
      "lifespan": 300,  // thời gian cache tối đa với mỗi endpoint được duyệt.
      "max-entries": 1000,  // số lượng endpoint tối đa mà server sẽ lưu.
    },
  }
}
```

3. Các bước để thực thi việc implement cấu hình keycloak xem trong file `keycloak-config.js`.

3. Bảo vệ một endpoint:
```php 
app.post("/animals", keycloak.enforcer(["animals:post"]), async (req, res) => {
  const animals = ["post cat", "post dog", "post fish"];
  res.send({status: 1, result: animals});
});
```
Các endpoint khi được một user hoặc client khác request vào tài nguyên thành công sẽ được lưu cache lại thông tin vừa request để những request tương tự không cần phải gửi lên keycloak server để  định giá permission.




