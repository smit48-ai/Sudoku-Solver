var arr = new Array(9);
for (var i = 0; i < 9; i++) {
    arr[i] = new Array(9);
}
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = 0;
    }
}

document.querySelectorAll("form")[0].addEventListener("submit", function () {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j] = parseInt(
                document.querySelectorAll("table")[0].rows[i].cells[j].querySelectorAll("input")[0].value
            );
            if (isNaN(arr[i][j])) arr[i][j] = 0;
        }
    }
    backtracking(0, 0);
});

function isvalid(row,col) {

        var x = new Array(10);
        for (var j = 0; j <= 9; j++) {
            x[j] = 0;
        }
        for (var j = 0; j < 9; j++) {
            x[arr[row][j]]++;
            if (x[arr[row][j]] > 1 && arr[row][j] != 0) {
                return false;
            }
        }

        for (var j = 0; j <= 9; j++) {
            x[j] = 0;
        }
        for (var j = 0; j < 9; j++) {
            x[arr[j][col]]++;
            if (x[arr[j][col]] > 1 && arr[j][col] != 0) {
                return false;
            }
        }
        var rows=row-row%3;
        var cols=col-col%3;
        for (var j = 0; j <= 9; j++) {
            x[j] = 0;
        }
        for (var i = rows; i < rows+3; i++) {
                for (var j = cols; j < cols+3; j++) {
                    x[arr[i][j]]++;
                    if (x[arr[i][j]] > 1 && arr[i][j] != 0) {
                        return false;
                    }
                }
        }
    return true;
}

function backtracking(x, y) {
    // alert(x);
    var ok = false;
    if (arr[x][y] != 0) {
        if (y + 1 < 9) {
            ok = backtracking(x, y + 1);
        } else if (x + 1 < 9) {
            ok = backtracking(x + 1, 0);
        } else {
            display();
            return true;
        }
    } else {
        for (var i = 1; i <= 9; i++) {
            arr[x][y] = i;
            if (isvalid(x,y)) {
                if (y + 1 < 9) {
                    ok = backtracking(x, y + 1);
                } else if (x + 1 < 9) {
                    ok = backtracking(x + 1, 0);
                } else {
                    display();
                    return true;
                }
                if (ok) return true;
            }
        }
        if (!ok) arr[x][y] = 0;
    }
    return ok;
}

function display() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            document
                .querySelectorAll("table")[0]
                .rows[i].cells[j].innerHTML=arr[i][j];
        }
    }
}

