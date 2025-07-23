import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
export const fomantMoney = number => Number(number?.toFixed(1)).toLocaleString()
export const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => {
        // Kiểm tra xem từ có phải là chữ cái hay không
        if (word.length === 0) return word; // Nếu từ rỗng, trả về từ rỗng
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}
export const renderStarProduct = (numberStar, size) => {
  const stars = [];
  numberStar = Math.round(numberStar);
  for (let index = 0; index < 5; index++) {
    if (index < numberStar) {
      stars.push(<IoMdStar key={index} color="orange" size={size || 16}/>)
    } else {
      stars.push(<IoIosStarOutline key={index} color="orange" size={size || 16}/>)
    }
  }
  return stars
}
// Convert file to base64
// Usage: fileToBase64(file).then(base64 => console.log(base64)).catch(error => console.error(error));
// Note: This function returns a Promise that resolves with the base64 string of the file.
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
/**
 * Định dạnh số theo tiền tệ
 * @param price - giá trị tiền
 * @param symbol - ký tự đại diện cho đơn vị tiền
 */
export const formatCurrency = (price, symbol = "$") => {
  var DecimalSeparator = Number('1.2').toLocaleString().substr(1, 1);

  var priceWithCommas = price.toLocaleString();
  var arParts = String(priceWithCommas).split(DecimalSeparator);
  var intPart = arParts[0];
  var decPart = arParts.length > 1 ? arParts[1] : '';
  decPart = (decPart + '00').substr(0, 2);

  return symbol + intPart + DecimalSeparator + decPart;
}