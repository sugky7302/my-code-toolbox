package smtp

import (
	"net/smtp"
)

/**
 * 發送不需要權限的郵件
 * @param {string} host - SMTP 伺服器
 * @param {string} port - SMTP 連接埠
 * @param {string} from - 寄件人(xxx@xxx)
 * @param {string} to - 收件人(xxx@xxx)
 * @param {string} subject - 主旨
 * @param {string} contentType - 內容類型
 * @param {string} body - 內容
 * @return {error} - 錯誤訊息
 */
func SendMail(host, port, from, to, subject, contentType, body string) error {
	// Set the email message
	message := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n" +
		"Content-Type: " + contentType + "; charset=UTF-8" + "\n\n" +
		body

	// Connect to the SMTP server
	client, err := smtp.Dial(host + ":" + port)
	if err != nil {
		return err
	}
	defer client.Close()

	// Set the sender and recipient
	if err := client.Mail(from); err != nil {
		return err
	}
	if err := client.Rcpt(to); err != nil {
		return err
	}

	// Send the email message
	data, err := client.Data()
	if err != nil {
		return err
	}
	defer data.Close()

	_, err = data.Write([]byte(message))
	if err != nil {
		return err
	}

	return nil
}

/**
 * 發送需要權限的郵件
 * @param {string} host - SMTP 伺服器
 * @param {string} port - SMTP 連接埠
 * @param {string} from - 寄件人(xxx@xxx)
 * @param {string} password - 寄件人密碼
 * @param {string} to - 收件人(xxx@xxx)
 * @param {string} subject - 主旨
 * @param {string} contentType - 內容類型
 * @param {string} body - 內容
 * @return {error} - 錯誤訊息
 */
func SendMailWithAuth(host, port, from, password, to, subject, contentType, body string) error {
	// Set the email message
	message := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n" +
		"Content-Type: " + contentType + "; charset=UTF-8" + "\n\n" +
		body

	// Set the SMTP server configuration
	auth := smtp.PlainAuth("", from, password, host)

	// Connect to the SMTP server
	err := smtp.SendMail(host+":"+port, auth, from, []string{to}, []byte(message))
	if err != nil {
		return err
	}

	return nil
}
