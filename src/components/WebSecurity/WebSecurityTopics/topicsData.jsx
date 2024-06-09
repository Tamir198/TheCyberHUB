// topicsData.js
const topics = [
    {
        id: 1,
        title: "Introduction to XSS",
        tags: ["XSS", "Web Security", "Database Security"],
        level: "Beginner",
        category: "XSS",
        desc: [
            {
                title: "Overview",
                content:
                    "XSS is a web security vulnerability that allows attackers to inject malicious scripts into trusted websites. These scripts execute in the victim's browser, potentially stealing data, redirecting users, or defacing websites. XSS is a widespread threat due to its ease of exploitation and diverse attack vectors.",
                labs: [
                    {
                        title: "Reflected XSS",
                        content: "Lab 1 content",
                        level: "Beginner",
                        link: "1",
                        isCompleted: false,
                    },
                    {
                        title: "Stored XSS",
                        content: "Lab 2 content",
                        level: "Beginner",
                        link: "2",
                        isCompleted: false,
                    },
                ],
            },
            {
                title: "Types of XSS",
                content: "XSS attacks can be classified into three main types: Reflected, Stored, and DOM-based.",
            },
            {
                title: "Reflected XSS",
                content: `Reflected Cross-Site Scripting (XSS) occurs when an attacker injects malicious scripts into user-provided data, such as input fields or URL parameters. These scripts are then reflected back to the user's browser by the web application, potentially leading to the execution of the malicious code in the context of the victim's session. Here's a javascript code which is vulnerable to Reflected XSS:

Reflected Cross-Site Scripting (XSS) occurs when an attacker injects malicious scripts into user-provided data, such as input fields or URL parameters. These scripts are then reflected back to the user's browser by the web application, potentially leading to the execution of the malicious code in the context of the victim's session. Here's a javascript code which is vulnerable to Reflected XSS:

\`\`\`javascript
let username = new URLSearchParams(window.location.search).get('user');
document.write("<h1>Hello, " + username + "!</h1>");
\`\`\`

The vulnerable code doesn't validate or sanitize the user input and thus the script below would be reflected in the HTML generated by document.write, leading to the execution of the malicious code when the page is loaded.

\`\`\`javascript
?user=<script>alert("XSS");</script>
\`\`\`
`,
            },
            {
                title: "Stored XSS",
                content: `Stored XSS (Cross-Site Scripting) occurs when an attacker injects malicious scripts into a website's database, and these scripts are then served to users when they retrieve the stored content, leading to the execution of the malicious code in their browsers. This type of XSS poses a persistent threat as the injected scripts are stored on the server, affecting all users who access the compromised content. Here's a javascript code which is vulnerable to Stored XSS:
\`\`\`javascript
let savedUsername = localStorage.getItem('user');
document.write("<h1>Hello, " + savedUsername + "!</h1>");
\`\`\`

The vulnerable code doesn't validate or sanitize the user input and thus the script below would be reflected in the HTML generated by document.write, leading to the execution of the malicious code when the page is loaded.

\`\`\`javascript
?user=<script>alert("XSS");</script>
\`\`\`
`,
            },
            {
                title: "DOM XSS",
                content: `In DOM XSS attack, an attacker injects malicious code into a web application's client-side script, often through user input. When the manipulated script is executed by the victim's browser, it can modify the Document Object Model (DOM) of the webpage, leading to unintended behaviors, data theft, or other security risks. Here's a javascript code which is vulnerable to DOM XSS:

\`\`\`javascript
let username = new URLSearchParams(window.location.search).get('user');
document.getElementById('greeting').innerHTML = "<h1>Hello, " + username + "!</h1>";
\`\`\`
           
The vulnerable code doesn't validate or sanitize the user input and thus the script below would be reflected in the HTML generated by document.write, leading to the execution of the malicious code when the page is loaded.

\`\`\`javascript
?user=<script>alert("XSS");</script>
\`\`\`
`,
            },
            {
                title: "Consequences",
                content: `- Data Theft: Attackers can steal sensitive information like cookies, session tokens, or credit card details.
- Account Takeover: Stolen credentials can be used to hijack user accounts.
- Malware Distribution: Malicious scripts can be used to download and install malware on user devices.
- Website Defacement: Attackers can alter the appearance or content of a website for malicious purposes.
- Phishing Attacks: XSS can be used to create more believable phishing attempts by embedding malicious code within seemingly legitimate websites.`,
            },
            {
                title: "Mitigation",
                content: `- Input Validation and Sanitization: Validate and sanitize all user input to remove potentially harmful characters that could be used for XSS attacks.
- Output Encoding: Encode user input before displaying it on a web page to prevent it from being interpreted as code.
- Content Security Policy (CSP): Implement a CSP to restrict the sources of scripts allowed to load on your web pages.
- Regular Security Testing: Conduct penetration testing and code reviews to identify and address potential XSS vulnerabilities`,
            },
            {
                title: "Importance",
                content: `XSS is a serious security threat that can have significant consequences for both users and organizations. By understanding XSS and implementing appropriate mitigation strategies, developers and security professionals can significantly reduce the risk of XSS attack.`,
            },
        ],
    },
    {
        id: 2,
        title: "Detailed Explanation of Reflected XSS",
        tags: ["XSS", "Web Security", "Reflected XSS"],
        level: "Intermediate",
        category: "XSS",
        desc: [
            {
                title: "Overview",
                content:
                    "when  a website reflects back the malicious input by the attacker , we call it as reflected XSS.",
            },
            {
                title: "Example of R-XSS 1",
                content: `lets take a look at this javascript code which reflects username without any sanitization
\`\`\`javascript          
function displayUsername() {
    var username = document.getElementById("username").value;
    document.getElementById("display").innerHTML = "Welcome, " + username;
}           
\`\`\`

so, it can be easily exploited with simple script payloads such as

\`\`\`html
<script>alert('XSS')</script>
\`\`\`      
protections can be implemented to protect from XSS reflections
first we need to find and analyse where our inputs gets reflected on the website 
    `,
            },
            {
                title: "Example of R-XSS 2",
                content: `let's take the an example where our \`username\` gets reflected inside a \`title tag\`
\`\`\`html
<title>username</title>
\`\`\`
so in this case the if we inject our payload 
\`\`\`html
<title><script>alert('XSS')</script></title>
\`\`\`
therefore it will not execute since the only permissible content of the \`<title>\` tag is plain text.

so what can we do is to break out from the <title> tag and execute our payload , for this we can input our own closing \`</title>\` tag and then continue our payload
\`\`\`html
</title><script>alert('XSS')</script>
\`\`\`
using the same logic we can break out of many different HTML tags 
\`\`\`html
</title><script>alert('XSS')</script>
</style><script>alert('XSS')</script>
</script><script>alert('XSS')</script>
</iframe><script>alert('XSS')</script>
</noscript><script>alert('XSS')</script>
</textarea><script>alert('XSS')</script>
\`\`\`
`,
            },
            {
                title: "Example of R-XSS 3",
                content: `when input lands inside an attribute’s value within double quote of an HTML tag
\`\`\`html
<input name="uname" value="inputReflectedHere">
\`\`\`
here we can breakout of it by closing the tag and start our payload
\`\`\`html
"><script>alert('XSS')</script>
\`\`\`
similarly we can breakout from attribute value within single quote 
\`\`\`html
<input name="uname" value='inputReflectedHere'>
\`\`\`
here we can breakout of it
\`\`\`html
'><script>alert('XSS')</script>
\`\`\`
`,
            },
            {
                title: "Mitigation",
                content: `- Input Validation and Sanitization: Validate and sanitize all user input to remove potentially harmful characters that could be used for XSS attacks.
- Output Encoding: Encode user input before displaying it on a web page to prevent it from being interpreted as code.
- Content Security Policy (CSP): Implement a CSP to restrict the sources of scripts allowed to load on your web pages.
- Regular Security Testing: Conduct penetration testing and code reviews to identify and address potential XSS vulnerabilities`,
            },
        ],
    },
    {
        id: 3,
        title: "Detailed Explanation of DOM-based XSS",
        tags: ["XSS", "Web Security", "DOM XSS"],
        level: "Intermediate",
        category: "XSS",
        desc: [
            {
                title: "What is DOM?",
                content:
                    "The Document Object Model (DOM) is a programming interface that provides a tree-like representation of HTML and XML documents, comprising nodes that symbolize elements, attributes, and text fragments. This dynamic representation allows for real-time modifications by JavaScript code and other technologies, enabling interactive and dynamic web page manipulation.",
            },
            {
                title: "How it is used in context of XSS?",
                content: `In context of XSS DOM plays an crucial role as the attacker injects malicious code into the DOM, which is then executed by the browser.
lets look at this code block 
\`\`\`javascript
function trackSearch(query) {
    document.write('<img src="/resources/images/tracker.gif?searchTerms='+query+'">');
}
var query = (new URLSearchParams(window.location.search)).get('search');
if(query) {
    trackSearch(query);
}

\`\`\`

here, the \`document.write()\` sink is used to write the data out on the page and \`window.location\` is used to get the data which is controlled by you , so here we can manupulate the \`document.write()\` sink to execute our malicious payload 
like,
\`\`\`html
"><svg onload=alert(1)> 
\`\`\`
`,
            },
            {
                title: "Testing for DOM-based XSS",
                content: `# HTML sinks

To test for HTML sinks we can insert some random alphanumeric string into the source such as location.search , and inspect the HTML to analyse where it gets reflected in the page and can try to break out of it .
        
# Javascript execution sinks
        
In this case we cannot analyse using inspect tools with some random string as it don't necessasily appear in the DOM , so we have to use Javascript debugger in order to analyse the js sinks and their behaviour in the page and accordingly tryto break out ot them to execute our XSS payload.
Analysing JavaScript code can be very challenging and tidious task to get DOM based XSS. 
We can also use DOM invader (Prebuilt tool of Burpsuite browser) in to ease our work.
You can resd about DOM invader [here](https://portswigger.net/burp/documentation/desktop/tools/dom-invader)
        

Which sinks can lead to DOM-XSS vulnerabilities?
[reference](https://portswigger.net/web-security/cross-site-scripting/dom-based)
        
The following are some of the main sinks that can lead to DOM-XSS vulnerabilities:
\`\`\`javascript
document.write()
document.writeln()
document.domain()
element.innerHTML()
element.outerHTML()
element.insertAdjacentHTML()
element.onevent()
\`\`\`
The following jQuery functions are also sinks that can lead to DOM-XSS vulnerabilities:
\`\`\`javascript
add()
after()
append()
animate()
insertAfter()
insertBefore()
before()
html()
prepend()
replaceAll()
replaceWith()
wrap()
wrapInner()
wrapAll()
has()
constructor()
init()
index()
jQuery.parseHTML()
$.parseHTML()
\`\`\`
`,
            },
            {
                title: "Mitigation",
                content: `- Input Validation and Sanitization: Validate and sanitize all user input to remove potentially harmful characters that could be used for XSS attacks.
- Output Encoding: Encode user input before displaying it on a web page to prevent it from being interpreted as code.
- Content Security Policy (CSP): Implement a CSP to restrict the sources of scripts allowed to load on your web pages.
- Regular Security Testing: Conduct penetration testing and code reviews to identify and address potential XSS vulnerabilities`,
            },
        ],
    },
    {
        id: 4,
        tags: ["CMD", "Web Security", "CMD Injection"],
        level: "Beginner",
        category: "CMDi",
        title: "Introduction to Command Injection",
        desc: [
            {
                title: "Overview",
                content:
                    "A command injection attack occurs when attackers manipulate an application by disguising malicious code as user input. This code, resembling legitimate commands, is then executed by the vulnerable application. This unauthorized execution can grant attackers control over the system, posing serious security risks.",
            },
            {
                title: "Example",
                content: `Lets say this URL is vulnerable to command injection:

\`https://vulnerablesite.com?userId=52\`

and this is the JavaScript code which is vulnerable to command injection:
\`\`\`javascript
function displayUserInfo(userId) {    
    const user = getUserFromDatabase(userId);
    const systemCommand = \`cat /home/users/\${userId}/info.txt\`;  
    
    // Vulnerable command
    const userDetails = exec(systemCommand); // Executes the command
    return userDetails;
}
\`\`\`
In the above code, the input is unsanitized to command injection attacks.
An attacker can modify the URL:

\`http://example.com/userinfo?userId=123; cat /etc/passwd\`

The server will execute the command:

\`cat /home/users/123; cat /etc/passwd\`

This reveals sensitive contents of \`/etc/passwd\` file.
We can protect it from command injections by properly sanitizing user input.
`,
            },
            {
                title: "Consequences",
                content: `- Data Breach: Attackers can steal sensitive information like user credentials, financial data, or confidential company documents.
- System Takeover: By executing privileged commands, attackers can gain complete control of the system, allowing them to install malware, disrupt operations, or launch further attacks.
- Website Defacement: Attackers might inject malicious code into web pages to deface websites or redirect traffic to phishing sites.`,
            },
            {
                title: "Mitigation",
                content: `- Input Validation: Rigorously validate all user input to ensure it only contains expected characters and formats. Sanitize the input to remove any potentially harmful code before processing it.
- Parameterization: Instead of directly embedding user input into commands, use parameterized queries or stored procedures. This prevents the application from treating user input as part of the actual command.
- Least Privilege: Applications should run with the least amount of privilege necessary to perform their intended function. Limiting privileges reduces the potential damage caused by a successful attack.`,
            },
            {
                title: "Importance",
                content:
                    "Command injection attacks are a serious threat because they can be exploited to achieve various malicious goals. They are relatively easy to launch for attackers with even basic technical skills. By prioritizing the mitigation strategies mentioned above, developers and system administrators can significantly reduce the risk of these attacks and protect their systems and data.",
            },
        ],
    },
    {
        id: 5,
        title: "Introduction to Path Traversal",
        tags: ["Path Traversal", "Web Security", "Database Security"],
        level: "Beginner",
        category: "Path Traversal",
        desc: [
            {
                title: "Overview",
                content:
                    "Path traversal vulnerability arises when user input is mishandled, enabling attackers to navigate outside the intended directory and gain unauthorized access to sensitive files or execute malicious actions on the server.",
            },
            {
                title: "Example",
                content: `\`https://vulnerablesite.com?page=5\`

Lets say we have the page directory saved on the application server, and the complete path to it is \`/var/www/page\`.
An attacker can move back in the directories using \`../\` recursively to reach its destined position. For \`/var/www/page\`, the attacker needs to move three directories back to get to the root directory \`../../../\` and then move up to read any sensitive data like \`/etc/passwd\`.
The final exploit will look like this:

\`https://vulnerablesite.com?page=../../../etc/passwd\`

Take a look at this vulnerable code prone to path traversal:

\`\`\`javascript
app.post('/upload', (req, res) => {
    const filePath = req.body.path;      
}
\`\`\`

If we use \`filePath\` directly in file operations without proper validation and sanitization, it could be exploited.
We can fix it by properly validating the path and sanitizing it:

\`\`\`javascript
const path = require('path');
app.post('/upload', (req, res) => {
    const userInputPath = req.body.path;
    
    // Validate and sanitize user input to prevent path traversal
    const sanitizedPath = path.normalize(userInputPath).replace(/^(..\\)+/, '');
    const filePath = path.join(__dirname, 'uploads', sanitizedPath);
    // Now use filePath for file operations
});
\`\`\`
`,
            },
            {
                title: "Consequences",
                content: `Successful path traversal attacks can have severe consequences:
- Data Breach: Attackers can access sensitive information like configuration files, databases containing user credentials, or application source code.
- System Compromise: By accessing system files or scripts, attackers might gain control over the server, install malware, or disrupt operations.
- Defacement: Attackers could exploit path traversal vulnerabilities to deface websites by modifying web page content.`,
            },
            {
                title: "Mitigation",
                content: `- Input Validation: Thoroughly validate user-supplied input before using it to construct file paths. Only allow characters and patterns that are safe for accessing files within the intended directory. Consider whitelisting permitted characters or file names.
- Sandboxing: Run applications in a sandboxed environment that restricts access to the underlying file system. This limits the potential damage if a path traversal vulnerability is exploited.
- Secure File Storage: Store sensitive files and configuration data outside of the web root directory, making them inaccessible through web requests.
- Regular Patching: Keep your web server software and applications updated with the latest security patches to address known vulnerabilities.`,
            },
            {
                title: "Importance",
                content:
                    "Path traversal attacks are a significant web security threat because they can be relatively easy to exploit and have potentially devastating consequences. By following the mitigation strategies above, developers and system administrators can significantly reduce the risk of these attacks.",
            },
        ],
    },
    {
        id: 6,
        title: "Introduction to NoSQL Injection",
        tags: ["NoSQLi", "Web Security", "Database Security"],
        level: "Beginner",
        category: "NoSQLi",
        desc: [
            {
                title: "Overview",
                content:
                    "Similar to SQL injection, NoSQL injection attacks exploit vulnerabilities in how applications interact with NoSQL databases. Attackers inject malicious code targeting the specific query language used by the NoSQL database (e.g., MongoDB Query Language (MQL) for MongoDB). This allows attackers to manipulate data, gain unauthorized access, or disrupt the database's operation.",
            },
            {
                title: "Example",
                content: `Vulnerable Code (MongoDB Example):
\`\`\`javascript
const username = req.body.username;
const query = { username: username }; 
// Find documents based on user input
const users = await User.find(query); 
\`\`\`

# Explanation:

User-supplied \`username\` is directly embedded into the MQL query object.

An attacker can craft a username containing malicious MQL operators or functions (e.g., \`username: {$where: "return true;"}\`).

The vulnerable code executes the entire crafted string as part of the MQL query.

In this example, the attacker bypasses any authentication checks as the malicious $where operator always returns true.

Vulnerable Code Fixed (Example):
\`\`\`javascript
// Fixed Node.js code with Mongoose
const username = req.body.username;
const query = { username: username?.trim() }; // Sanitize input
// Use a parameterized query
const users = await User.find({ username: { $eq: username } }); // Safe binding
\`\`\`

# Explanation:

User input is sanitized (e.g., trimming) before embedding it in the query object.

A parameterized query is used with a placeholder for the username?.

The actual username value is bound to the parameter, preventing unintended code execution.`,
            },
            {
                title: "Consequences",
                content: `- Data Theft: Attackers can steal sensitive data stored in the NoSQL database.
- Data Manipulation: Attackers can modify or delete existing data, causing inconsistencies or disruption.
- Unauthorized Access: Attackers can bypass authentication and gain access to unauthorized data or functionality.
- Denial-of-Service (DoS): Attackers can launch DoS attacks by overwhelming the database with complex or resource-intensive queries.`,
            },
            {
                title: "Mitigation",
                content: `- Input Validation: Rigorously validate all user input to ensure it conforms to expected data types and formats. Sanitize input to remove potentially harmful characters or operators.
- Parameterized Queries: Use libraries or frameworks that provide parameterized query functionality to separate data from query logic.
- Object Destructuring: In some languages, leverage object destructuring to create queries from trusted sources.
- Whitelist Valid Operators: If applicable, restrict the allowed operators and functions within NoSQL queries.
- Least Privilege: Grant applications the minimum privileges necessary to perform their intended tasks within the database.
- Regular Patching: Keep NoSQL database software and application libraries updated with the latest security patches.`,
            },
            {
                title: "Importance",
                content: `NoSQL injection attacks pose a significant threat to applications that rely on NoSQL databases. By implementing robust mitigation strategies, developers and system administrators can help safeguard their NoSQL databases from unauthorized access and data breaches.`,
            },
        ],
    },
    {
        id: 7,
        title: "Introduction to SQLi",
        tags: ["SQLi", "Web Security", "Database Security"],
        level: "Beginner",
        category: "SQLi",
        desc: [
            {
                title: "Overview",
                content:
                    "SQL injection (SQLi) is a cyberattack that exploits vulnerabilities in how applications interact with database systems. Attackers inject malicious SQL code into user input, which is then unknowingly executed by the application's database server. This allows attackers to manipulate data, gain unauthorized access, or even compromise the entire database.",
            },
            {
                title: "Example",
                content: `Vulnerable Code:
\`\`\`php
//(On the server-side)\n$username = $_GET["username"];
$password = $_GET["password"];
$sqlQuery = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($conn, $sqlQuery); // Vulnerable: User input directly embedded
// Process the query results
\`\`\`

# Explanation:
- User input (\`username\` and \`password\`) is directly inserted into the SQL query string.
- An attacker can craft a username containing malicious code (e.g., \`username='admin'; DROP TABLE users;--\`).
- The vulnerable code executes the entire crafted string as an SQL statement.
- In this example, the attacker drops the entire \`users\` table, potentially deleting all user data.
Vulnerable Code Fixed:
\`\`\`php
// (On the server-side)
$username = mysqli_real_escape_string($conn, $_GET["username"]); // Escapes special characters
$password = mysqli_real_escape_string($conn, $_GET["password"]);
$sqlQuery = "SELECT * FROM users WHERE username = ? AND password = ?";
$stmt = mysqli_prepare($conn, $sqlQuery); // Prepared statement
mysqli_stmt_bind_param($stmt, "ss", $username, $password); // Bind parameters
mysqli_stmt_execute($stmt); // Execute prepared statement
// Process the query results (using mysqli_stmt_fetch)
\`\`\`

# Explanation:
- User input is escaped using \`mysqli_real_escape_string\` before embedding it in the query string.
- A prepared statement is used to separate the SQL code from user input.\n- Parameters (\`?\`) are used as placeholders for user input.
- Input is bound to the parameters using \`mysqli_stmt_bind_param\`.
- The prepared statement is then executed using \`mysqli_stmt_execute\`.
            `,
            },
            {
                title: "Consequences",
                content: `- Data Theft: Attackers can steal sensitive data like usernames, passwords, credit card numbers, or other personal information.
- Data Manipulation: Attackers can modify or delete existing data, potentially causing corruption or disruption.
- Unauthorized Access: Attackers can gain unauthorized access to the database or even the entire system.
- Denial-of-Service (DoS): Attackers can launch DoS attacks by overwhelming the database server with malicious queries.`,
            },
            {
                title: "Mitigation",
                content: `- Input Validation: Validate all user input to ensure it conforms to expected data types and formats.
- Parameterized Queries: Use prepared statements or parameterized queries to separate data from SQL code.
- Stored Procedures: Consider using stored procedures to pre-compile and store frequently used SQL statements.
- Least Privilege: Grant applications the minimum database privileges necessary for their intended function.
- Regular Patching: Keep database software and applications updated with the latest security patches.
- Database Security Best Practices: Implement best practices for database security configuration and access control.`,
            },
            {
                title: "Importance",
                content: `SQL injection is one of the most common and dangerous web application vulnerabilities. By prioritizing the mitigation strategies mentioned above, developers and system administrators can significantly reduce the risk of these attacks and protect their databases and sensitive data.`,
            },
        ],
    },
];

export default topics;
