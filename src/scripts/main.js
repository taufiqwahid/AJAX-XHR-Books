function main() {

    const baseUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=f1ab19c53cebd5165e00ac39dcf8b1ef&language=en-US&page=1";
    console.log(baseUrl)

    const getBook = async () => {
        try {
            const response = await fetch(`${baseUrl}`);
            const responseJson = await response.json();
            console.log(responseJson)
            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllBooks(responseJson.results);
                console.log(responseJson.results)
            }
        } catch (error) {
            showResponseMessage(error);
        }
    }


    const insertBook = (book) => {
        // Membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();

        //menetapkan callback jika response sukses dan error
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }

        xhr.onerror = function () {
            showResponseMessage();
        }

        // Membuat POST request dan menetapkan target URL
        xhr.open("POST", `${baseUrl}/add`);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");

        // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
        xhr.send(JSON.stringify(book));
    };

    const updateBook = (book) => {
        // Membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();

        //menetapkan callback jika response sukses dan error
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }

        xhr.onerror = function () {
            showResponseMessage();
        }

        // Membuat PUT request dan menetapkan target URL
        xhr.open("PUT", `${baseUrl}/edit/${book.id}`);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");

        // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
        xhr.send(JSON.stringify(book));
    };

    const removeBook = (bookId) => {
        // Membuat instance dari XMLHttpRequest
        const xhr = new XMLHttpRequest();

        //menetapkan callback jika response sukses dan error
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }

        xhr.onerror = function () {
            showResponseMessage();
        }

        // Membuat DELETE request dan menetapkan target URL
        xhr.open("DELETE", `${baseUrl}/delete/${bookId}`);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        xhr.setRequestHeader("X-Auth-Token", "12345");

        // Mengirimkan request
        xhr.send();
    };






    /*
        jangan ubah kode di bawah ini ya!
    */

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";
        // listBookElement.innerHTML = `<div class="row">`;
        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>${book.original_title}</h5>
                            <p>${book.overview}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">${book.release_date}</button>
                        </div>
                    </div>
                </div>
            `;

            // listBookElement.innerHTML += `
            //     <div class="col-6 card" >
            //         <img class="card-img-top" src="..." alt="Card image cap">
            //         <div class="card-body">
            //             <h5 class="card-title">${book.title}</</h5>
            //             <p class="card-text">${book.author}</p>
            //         </div>
            //         <div class="card-footer">
            //             <small class="text-muted">tahun rilis</small>
            //         </div>
            //     </div>
            // `;


        });
        // listBookElement.innerHTML = `</div>`;
        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");
        const buttonReset = document.querySelector("#buttonReset");

        buttonSave.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });

        buttonReset.addEventListener("click", function () {
            inputBookAuthor.value = ""
            inputBookId.value = ""
            inputBookTitle.value = ""
        });
        getBook();
    });
}

export default main;
