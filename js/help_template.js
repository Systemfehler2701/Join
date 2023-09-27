function renderHelp() {
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
        <div class="help-content">
            <div class="arrow-left"><img src="assets/img/arrow-left-line.svg"></div>
            <div class="other-headline"><h1>Help</h1></div>
                <p>Welcome to the help page for <span class="join">Join</span>, your guide to using our kanban project management tool. Here, we'll provide an overview of what <span class="join">Join</span> is, how it can benefit you, and how to use it.</p>
            <div>
                <h2>What is Join?</h2>
                <p><span class="join">Join</span> is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie.</p>

                <p>Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). <span class="join">Join</span> leverages the principles of kanban to help users manage their tasks and projects in an intuitive, visual interface.</p>

                <p>It is important to note that <span class="join">Join</span> is designed as an educational exercise and is not intended for extensive business usage. While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding <span class="join">Join</span>.</p>
            </div>
            <div>
                <h2>How to use it</h2>
                <p>Here is a step-by-step guide on how to use <span class="join">Join</span>:</p>
                <div>
                    <div>
                        <h3>1.</h3>
                        <div>
                            <h3>Exploring the Board</h3>
                            <p>When you log in to <span class="join">Join</span>, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p>
                        </div>
                    </div>
                    <div>
                        <h3>2.</h3>
                        <div>
                            <h3>Creating Contacts</h3>
                            <p>In <span class="join">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.</p>
                        </div>
                    </div>
                    <div>
                        <h3>3.</h3>
                        <div>
                            <h3>Adding Cards</h3>
                            <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc.</p>
                        </div>
                    </div>
                    <div>
                        <h3>4.</h3>
                        <div>
                            <h3>Moving Cards</h3>
                            <p>As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.</p>
                        </div>
                    </div>
                    <div>
                        <h3>5.</h3>
                        <div>
                            <h3>Deleting Cards</h3>
                            <p>Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting cards, as this action is irreversible.
                            Remember that using <span class="join">Join</span> effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.
                            Have more questions about <span class="join">Join</span>? Feel free to contact us at [Your Contact Email]. We're here to help you!</p>
                        </div>
                    </div>
                </div>
                <h2>Enjoy using Join!</h2>
            </div>
        </div>    
        `;
}