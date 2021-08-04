const net = require("net");

const server = net.createServer(socket => {
    socket.on("data", data => {
        const equation = data.toString();

        // checking white space and point (float value)
        if (equation.includes(" ") || equation.includes("."))
            return socket.write("error: incorrect syntax\n");

        // global variable for storing calculated result
        let result;

        // checking division by zero
        if (equation.includes("/")) {

            result = eval(equation);
            result = Math.floor(eval(equation)) >>> 0;

            if (!result)
                return socket.write("error: division by zero\n");
            else
                return socket.write(result + "\n");
        
        // checking modulo by zero
        } else if (equation.includes("%")) {

            result = eval(equation);
            result = Math.floor(eval(equation)) >>> 0;
            if (!result)
                return socket.write("error: modulo by zero\n");
            else
                return socket.write(result + "\n");

        } else {

            // handeling exception if equation fail to calculate result
            try {
                result = Math.floor(eval(equation)) >>> 0;
                return socket.write(result + "\n");
            } catch (error) {
                return socket.write("error: incorrect syntax\n");
            }
        }
    });
});

server.listen(3000);

// Mr. Perfect