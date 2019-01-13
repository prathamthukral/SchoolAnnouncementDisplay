function periodReturn() {
    // [start hour, start min, end hour, end minute, period name]
    var periods = [
        [8, 0, 9, 24, "Period 1"],
        [9, 25, 10, 43, "Period 2"],
        [10, 44, 12, 2, "Period 3"],
        [12, 3, 13, 20, "Period 4"],
        [13, 21, 14, 40, "Period 5"],
        [14, 41, 18, 0, "After School"],
        [18, 1, 7, 0, "offlineMode"],
    ]
    return periods
}

// Default Settings for COPYING ONLY (edit periods above)
// function periodReturn(){
//     // [start hour, start min, end hour, end minute, period name]
//     var periods = [
//         [8, 0, 9, 24, "Period 1"],
//         [9, 25, 10, 43, "Period 2"],
//         [10, 44, 12, 2, "Period 3"],
//         [12, 3, 13, 20, "Period 4"],
//         [13, 21, 14, 40, "Period 5"],
//         [14, 41, 18, 0, "After School"],
//         [18, 1, 7, 0, "offlineMode"],
//     ]
//     return periods
// }