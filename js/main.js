// Wait for the HTML document to be loaded
document.addEventListener('DOMContentLoaded', () => {

    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    
    let commandHistory = [];
    let historyIndex = -1;

    // --- RESUME DATA ---

    const help = `
Available commands:
  <span style="color: #00e676;">summary</span>    - Show my professional summary
  <span style="color: #00e676;">skills</span>     - List my technical skills
  <span style="color: #00e676;">experience</span> - Show my work experience
  <span style="color: #00e676;">projects</span>   - Detail my key projects
  <span style="color: #00e676;">education</span>  - List my education
  <span style="color: #00e676;">contact</span>    - Show contact information
  <span style="color: #00e676;">open</span>       - Usage: 'open linkedin'
  <span style="color: #00e676;">clear</span>      - Clear the terminal screen
  <span style="color: #00e676;">help</span>       - Show this help message
    `;

    const summary = `
Accomplished Data Engineer with over 3 years of experience architecting and scaling data infrastructure on the Azure cloud. Proven ability to build robust, high-throughput data pipelines.

Currently pivoting towards Machine Learning Engineering, combining a strong background in data modeling and ETL/ELT with hands-on experience in developing AI-powered solutions using LLMs, RAG, and Python.
    `;

    const skills = `
<h2>Languages & Frameworks</h2>
<ul>
    <li>Python</li>
    <li>PySpark</li>
    <li>SQL</li>
    <li>T-SQL</li>
    <li>Shell Scripting</li>
</ul>
<h2>Machine Learning & AI</h2>
<ul>
    <li>Pandas</li>
    <li>NumPy</li>
    <li>Scikit-learn</li>
    <li>LangChain</li>
    <li>LLMs (OpenAI)</li>
    <li>Vector Databases (ChromaDB)</li>
    <li>Retrieval-Augmented Generation (RAG)</li>
</ul>
<h2>Data & MLOps Platforms</h2>
<ul>
    <li>Azure Databricks</li>
    <li>Delta Lake</li>
    <li>Azure Synapse Analytics</li>
    <li>Azure DevOps (CI/CD)</li>
</ul>
<h2>ETL/ELT & Orchestration</h2>
<ul>
    <li>Azure Data Factory (ADF)</li>
    <li>SSIS</li>
    <li>Informatica PowerCenter</li>
</ul>
    `;

    const experience = `
<h2>Engineer - Azure & Databricks (Dec 2022 - Present)</h2>
<ul>
    <li>Engineered and automated end-to-end data pipelines processing over 100 GB of data daily.</li>
    <li>Architected and optimized scalable data models in Delta Lake, improving query performance by over 30%.</li>
    <li>Orchestrated complex data workflows in Azure Data Factory, integrating diverse sources with 99.9% data integrity.</li>
    <li>Collaborated within an Agile-Scrum framework, handling requirements, test plans, and CI/CD release cycles.</li>
</ul>

<h2>Developer - Informatica PowerCenter (Jul 2022 - Dec 2022)</h2>
<ul>
    <li>Spearheaded the migration of legacy Java-based ETL processes to Informatica PowerCenter.</li>
    <li>Developed and deployed over 70 complex transformation workflows to enforce critical business logic.</li>
    <li>Authored and performance-tuned complex SQL and T-SQL queries, reducing execution time by an average of 20%.</li>
</ul>
    `;

    const projects = `
<h2>Assistant for Data Product Development (Client Hackathon - 2nd Prize Winner)</h2>
<ul>
    <li>Co-developed a proof-of-concept for an AI assistant to accelerate data product creation.</li>
    <li>Architected a Retrieval-Augmented Generation (RAG) pipeline using LangChain and ChromaDB to index internal documentation.</li>
    <li>Integrated an OpenAI LLM to provide contextual code generation (SQL, PySpark) and answer natural language queries.</li>
    <li>Secured 2nd place in a competitive, domain-wide hackathon.</li>
</ul>

<h2>Agentic AI for Research Insights</h2>
<ul>
    <li>Built a prototype of an AI agent to autonomously extract, synthesize, and categorize key insights from complex life science research papers.</li>
    <li>Leveraged LLMs and advanced retrieval techniques to identify experimental outcomes and methodologies from unstructured text.</li>
</ul>
    `;

    const education = `
<h2>Executive Diploma in ML & AI (Pursuing)</h2>
<p>  IIIT Bangalore (Expected 2026)</p>

<h2>B.E. in Instrumentation Engineering</h2>
<p>  Mumbai University (CGPA: 8.13, 2022)</p>
    `;

    const contact = `
<h2>Get in Touch</h2>
<ul>
    <li><a href="mailto:prijithayure@gmail.com">prijithayure@gmail.com</a></li>
    <li><a href="https://www.linkedin.com/in/prijithayure/" target="_blank">linkedin.com/in/prijithayure</a></li>
</ul>
<p>You can also type <span style="color: #00e676;">'open linkedin'</span> to open my profile.</p>
    `;

    const commands = {
        help,
        summary,
        skills,
        experience,
        projects,
        education,
        contact,
    };

    // --- TERMINAL LOGIC ---

    // Welcome message
    printResponse("Booting PrijithAyure-Portfolio v3.0 (Azure-Core)...");
    setTimeout(() => printResponse("Boot sequence complete. Welcome."), 500);
    setTimeout(() => printResponse("\nYou are in a shell environment. This portfolio is interactive. \nType <span style='color: #00e676;'>'help'</span> to see all available commands."), 1000);
    
    // Handle input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';

            // Print the command user typed
            printLine(cmd, 'command', 'PrijithAyure:~$');

            // Add to history
            if (cmd) {
                commandHistory.unshift(cmd);
                historyIndex = -1;
            }

            // Process command
            if (cmd === 'clear') {
                output.innerHTML = '';
            } else if (cmd === 'help') {
                printResponse(help);
            } else if (commands[cmd]) {
                printResponse(commands[cmd]);
            } else if (cmd.startsWith('open ')) {
                const target = cmd.split(' ')[1];
                if (target === 'linkedin') {
                    printResponse("Opening LinkedIn profile in new tab...");
                    window.open('https://www.linkedin.com/in/prijithayure/', '_blank');
                } else {
                    printResponse(`Error: Unknown target '${target}'. Try 'linkedin'.`, 'error');
                }
            } else if (cmd === '') {
                // Do nothing on empty enter
            } else {
                printResponse(`Command not found: ${cmd}. Type 'help' for a list of commands.`, 'error');
            }
            
            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;

        } else if (e.key === 'ArrowUp') {
            if (commandHistory.length > 0) {
                historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                input.value = '';
            }
        }
    });

    // Helper to print a new line
    function printLine(text, className, prompt = '') {
        const line = document.createElement('div');
        line.className = 'line';
        
        if (prompt) {
            const p = document.createElement('span');
            p.className = 'prompt';
            p.textContent = prompt;
            line.appendChild(p);
        }
        
        const content = document.createElement('span');
        content.className = className;
        content.innerHTML = text; // Use innerHTML to render styled spans
        line.appendChild(content);
        
        output.appendChild(line);
    }

    // Helper to print a response
    function printResponse(text, className = 'response') {
        const p = document.createElement('p');
        p.className = className;
        p.innerHTML = text; // Use innerHTML to render HTML formatting
        output.appendChild(p);
    }

}); // End of DOMContentLoaded