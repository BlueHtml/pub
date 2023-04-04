function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
    const formNode = document.querySelector('form.login-left');
    let submitNode;
    while (null === (submitNode = formNode.querySelector('.login-btn'))?.offsetParent) {
        await delay(4000);
    }
    formNode.querySelector('.login-username').value = '@U';
    formNode.querySelector('.login-password').value = '@P';
    submitNode.click();
}

main();
