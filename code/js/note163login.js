function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
    let formNode, submitNode;
    while (!(formNode = document.querySelector('#login form')) || null === (submitNode = formNode.querySelector('#loginbtn'))?.offsetParent) {
        document.querySelector('#netease-login')?.click();
        await delay(4000);
    }
    formNode.querySelector('#user').value = '@U';
    formNode.querySelector('#pass').value = '@P';
    submitNode.click();
}

main();
