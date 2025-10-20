document.addEventListener('DOMContentLoaded', () => {

    const chatOutput = document.getElementById('chat-output');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // --- RAG DATABASE (Simulated) ---

    const welcome = "Analyzing... Connection established.\n\nHello. I am an interface built to process and present information on Prijith Ayure. He is a Data Engineer... and an artist... currently focused on the intersection of data and AI.\n\nWhat would you like to know about him? You can ask about his 'skills', 'projects', 'experience', or 'contact'.";

    const responses = {
        "default": "I am processing that... However, my parameters are limited. Please ask about 'skills', 'projects', 'experience', 'art', or 'contact'.",
        "hello": "Hello. I am online and ready to assist.",
        "skills": "Querying skills... \n\nHe works with the tools of data architecture: \n- **Languages:** Python, PySpark, SQL\n- **AI/ML:** LangChain, LLMs (OpenAI), RAG, Vector Databases (ChromaDB), Pandas, Scikit-learn\n- **Platforms:** Azure Databricks, Delta Lake, Azure Synapse, Azure DevOps",
        "experience": "Querying employment history... \n\n**Engineer - Azure & Databricks (Dec 2022 - Present)**\n- Architected pipelines for >100GB of daily data.\n- Optimized Delta Lake models, boosting query performance by 30%.\n- Orchestrated workflows in Azure Data Factory.\n\n**Developer - Informatica PowerCenter (Jul 2022 - Dec 2022)**\n- Migrated legacy Java ETLs to Informatica.\n- Deployed 70+ transformation workflows.\n- Tuned SQL queries, reducing execution time by 20%.",
        "projects": "Querying key projects... \n\n**1. AI Assistant for Data Product Development (2nd Prize Winner)**\n- Built a RAG pipeline using LangChain and ChromaDB to index documentation and generate SQL/PySpark code, demonstrating a 25-40% reduction in development effort.\n\n**2. Agentic AI for Research Insights**\n- Prototyped an AI agent to autonomously extract and synthesize insights (methodologies, conclusions) from unstructured text in life science research papers.",
        "art": "Prijith is also an artist. He believes that building an efficient data model and creating a compelling piece of art both stem from the same place: finding the signal in the noise. He is currently exploring generative art.",
        "contact": "Contact protocols initiated... \n- **Email:** <a href='mailto:prijithayure@gmail.com'>prijithayure@gmail.com</a>\n- **LinkedIn:** <a href='https://www.linkedin.com/in/prijithayure/' target='_blank'>linkedin.com/in/prijithayure</a>",
    };

    // --- CHAT LOGIC ---

    function addMessage(sender, text) {
        const message = document.createElement('div');
        message.classList.add('message', sender);
        
        const senderName = (sender === 'user') ? 'You' : 'Analyst';
        
        message.innerHTML = `
            <div class="sender">${senderName}</div>
            <div class="text">${text}</div>
        `;
        
        chatOutput.appendChild(message);
        chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll
    }

    // NEW "AI" function
    function getResponse(question) {
        question = question.toLowerCase();
        
        if (question.includes('hello') || question.includes('hi')) {
            return responses.hello;
        }
        if (question.includes('skill') || question.includes('tech')) {
            return responses.skills;
        }
        if (question.includes('experience') || question.includes('work') || question.includes('job')) {
            return responses.experience;
        }
        if (question.includes('project') || question.includes('work')) {
            return responses.projects;
        }
        if (question.includes('art') || question.includes('creative') || question.includes('artist')) {
            return responses.art;
        }
        if (question.includes('contact') || question.includes('email') || question.includes('linkedin')) {
            return responses.contact;
        }
        
        return responses.default;
    }

    function handleSend() {
        const question = chatInput.value.trim();
        if (question === "") return;

        addMessage('user', question);
        chatInput.value = "";

        // Simulate AI thinking
        setTimeout(() => {
            const response = getResponse(question);
            addMessage('ai', response);
        }, 800);
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Initial welcome message
    addMessage('ai', welcome);

}); // End of DOMContentLoaded