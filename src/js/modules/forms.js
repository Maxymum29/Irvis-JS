import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        formModal = document.querySelectorAll('[data-modal]');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Отправка...',
        succses: 'Спасибо, скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...:(',
    };

    const postData = async (url, data) => {
        document.querySelector('.status').innerHTML = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data,
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = '';
        });
    };

    const closeForm = () => {
        formModal.forEach((item) => {
            item.style.display = 'none';
            document.body.style.overflow = '';
        });
    };

    form.forEach((item) => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.append(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then((res) => {
                    console.log(res);
                    statusMessage.innerHTML = message.succses;
                })
                .catch(() => (statusMessage.innerHTML = message.failure))
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        closeForm();
                    }, 5000);
                });
        });
    });
};

export default forms;
