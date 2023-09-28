function renderHelp() {
    document.getElementById('help-link').classList.add("d-none");
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
        <div class="help-content">
            <div class="arrow-left"><img src="assets/img/arrow-left-line.svg"></div>
            <h1>Help</h1>
                <p>Welcome to the help page for <span class="colored-word">Join</span>, your guide to using our kanban project management tool. Here, we'll provide an overview of what <span class="colored-word">Join</span> is, how it can benefit you, and how to use it.</p>
            <div>
                <h2>What is Join?</h2>
                <p><span class="colored-word">Join</span> is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie.</p>

                <p>Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). <span class="colored-word">Join</span> leverages the principles of kanban to help users manage their tasks and projects in an intuitive, visual interface.</p>

                <p>It is important to note that <span class="colored-word">Join</span> is designed as an educational exercise and is not intended for extensive business usage. While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding <span class="colored-word">Join</span>.</p>
            </div>
            <div>
                <h2>How to use it</h2>
                <p>Here is a step-by-step guide on how to use <span class="colored-word">Join</span>:</p>
                <div>
                    <div>
                        <h3>1.</h3>
                        <div>
                            <h3>Exploring the Board</h3>
                            <p>When you log in to <span class="colored-word">Join</span>, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p>
                        </div>
                    </div>
                    <div>
                        <h3>2.</h3>
                        <div>
                            <h3>Creating Contacts</h3>
                            <p>In <span class="colored-word">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.</p>
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
                            Remember that using <span class="colored-word">Join</span> effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.
                            Have more questions about <span class="colored-word">Join</span>? Feel free to contact us at [Your Contact Email]. We're here to help you!</p>
                        </div>
                    </div>
                </div>
                <h2>Enjoy using Join!</h2>
            </div>
        </div>    
        `;
}


function renderNotice() {
    let content = document.getElementById('content');
    content.innerHTML = /* html */ `
    <div class="help-content">
            <div class="arrow-left"><img src="assets/img/arrow-left-line.svg"></div>
            <h1>Legal Notice</h1>
            <h2>Imprint</h2>
            <ul>
                <li>Marnie Lindenthal</li>
                <li>Jonas Kratzberg</li>
                <li>Jan Woll</li>
                <li>Florian Lindenthal</li>
            </ul>
            <h3>Exploring the Board</h3>
            <p>Email: dont-feed-the-gremlins@kleinemonster.de</p>
            <h3>Acceptance of terms</h3>
            <p>By accessing and using <span class="colored-word">Join</span> (Product), you acknowledge and agree to the following terms and conditions, and any policies, guidelines, or amendments thereto that may be presented to you from time to time. We, the listed students, may update or change the terms and conditions from time to time without notice.</p>
            <h3>Scope and ownership of the product</h3>
            <p><span class="colored-word">Join</span> has been developed as part of a student group project in a web development bootcamp at the <span class="colored-word">Developer Akademie GmbH</span>. It has an educational purpose and is not intended for extensive personal & business usage. As such, we cannot guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product.</p>
            <p>The design of <span class="colored-word">Join</span> is owned by the <span class="colored-word">Developer Akademie GmbH</span>. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.</p>
            <h3>Proprietary rights</h3>
            <p>Aside from the design owned by <span class="colored-word">Developer Akademie GmbH</span>, we, the listed students, retain all proprietary rights in <span class="colored-word">Join</span>, including any associated copyrighted material, trademarks, and other proprietary information.</p>
            <h3>Use of the product</h3>
            <p><span class="colored-word">Join</span> is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. Any use of <span class="colored-word">Join</span> for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. You are solely responsible for your interactions with other users of <span class="colored-word">Join</span>.</p>
            <h3>Disclaimer of warranties and limitation of liability</h3>
            <p><span class="colored-word">Join</span> is provided "as is" without warranty of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event will we, the listed students, or the <span class="colored-word">Developer Akademie</span>, be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages, arising out of or in connection with the use or performance of <span class="colored-word">Join</span>.</p>
            <h3>Indemnity</h3>
            <p>You agree to indemnify, defend and hold harmless us, the listed students, the <span class="colored-word">Developer Akademie</span>, and our affiliates, partners, officers, directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or liability (including reasonable legal fees) arising out of or relating to your use of <span class="colored-word">Join</span> and/or your breach of this Legal Notice.</p>
            <p>For any questions or notices, please contact us at dont-feed-the-gremlins@kleinemonster.de.</p>

            <p>Date: July 26, 2023</p>
    `;
}