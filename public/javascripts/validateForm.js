const integerPattern = /^\d+$/;
const form = document.getElementById('accountForm');
const amountInput = document.querySelector('input[name="amount"]');

/**
 * 驗證表單數據是否有效。
 * @returns {boolean}
 */
function validateForm() {
    if (!checkAmount(amountInput.value.trim())) {
        return false;
    }
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }

    return true;
}

/**
 * 檢查金額輸入是否為整數。
 * @param {string} amountValue
 * @returns {boolean} 
 */
function checkAmount(amountValue) {
    if (!integerPattern.test(amountValue)) {
        amountInput.classList.add('is-invalid');
        return false;
    } else {
        amountInput.classList.remove('is-invalid');
        return true;
    }
}