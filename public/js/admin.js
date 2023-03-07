const onClickDelete = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value
    const csft_token = btn.parentNode.querySelector('[name=_csrf]').value
    const productElement = btn.closest('article')
    fetch("/admin/product/" + prodId, {
        method: "DELETE",
        headers: {
            "csrf-token": csft_token
        }
    }).then(result => {
        productElement.parentNode.removeChild(productElement)
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}