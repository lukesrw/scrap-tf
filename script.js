/*global window document send*/

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sort").addEventListener("click", async () => {
        await send({
            action: "sort"
        });
    });

    document.getElementById("trade").addEventListener("click", async () => {
        await send({
            action: "auto",
            arguments: [
                document.getElementById("number").value,
                document.getElementById("filter").value,
                document.getElementById("half").value === "1",
                document.getElementById("auto").value === "1"
            ]
        });
    });
});
