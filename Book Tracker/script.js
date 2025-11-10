 // In-memory storage (will be replaced with MySQL database calls)
        let books = [];
        let currentFilter = 'all';

        // Load books from localStorage on page load
        window.addEventListener('DOMContentLoaded', () => {
            const savedBooks = localStorage.getItem('books');
            if (savedBooks) {
                books = JSON.parse(savedBooks);
                displayBooks();
            }
        });

        // Add book form submission
        document.getElementById('bookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const book = {
                id: Date.now(),
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                genre: document.getElementById('genre').value,
                status: document.getElementById('status').value,
                rating: document.getElementById('rating').value || null,
                notes: document.getElementById('notes').value
            };

            // TODO: Replace with MySQL INSERT query
            books.push(book);
            saveToStorage();
            displayBooks();
            
            // Reset form
            e.target.reset();
            
            // Show success feedback
            alert('Book added successfully!');
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                displayBooks();
            });
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            displayBooks(e.target.value);
        });

        // Display books
        function displayBooks(searchTerm = '') {
            const container = document.getElementById('booksContainer');
            
            let filteredBooks = books;
            
            // Apply filter
            if (currentFilter !== 'all') {
                filteredBooks = filteredBooks.filter(book => book.status === currentFilter);
            }
            
            // Apply search
            if (searchTerm) {
                filteredBooks = filteredBooks.filter(book => 
                    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (filteredBooks.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        