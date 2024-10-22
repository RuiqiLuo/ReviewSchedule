// 获取当前日期
const currentDate = new Date();

// 存储今天的计划
const todayPlans = [];

// 添加计划
function addPlan() {
    const planInput = document.getElementById('plan-input');
    const plan = planInput.value.trim();
    if (plan) {
        todayPlans.push({ plan: plan, completed: false });
        planInput.value = '';
        displayTodayPlans();
    }
}

// 显示今天的计划
function displayTodayPlans() {
    const todayPlansList = document.getElementById('today-plans-list');
    todayPlansList.innerHTML = '';
    todayPlans.forEach((planObj, index) => {
        const li = document.createElement('li');
        const status = planObj.completed ? '已完成' : '未完成';
        li.innerHTML = `${index + 1}. ${planObj.plan} <button onclick="toggleComplete(${index})">${status}</button>`;
        todayPlansList.appendChild(li);
    });
}

// 切换计划的完成状态
function toggleComplete(index) {
    const planObj = todayPlans[index];
    planObj.completed = !planObj.completed;
    displayTodayPlans();
}

// 打印今天应该复习的日期
function printReviewDates(currentDate) {
    // 复习间隔（以天为单位）
    const intervals = [1, 2, 4, 7, 15, 30, 60, 90, 180, 365];
    const reviewDatesList = document.getElementById('review-plans-list');
    reviewDatesList.innerHTML = '';

    intervals.forEach((interval) => {
        const reviewDate = new Date(currentDate);
        reviewDate.setDate(currentDate.getDate() - interval);
        const formattedDate = `${reviewDate.getFullYear()}-${reviewDate.getMonth() + 1}-${reviewDate.getDate()}`;
        const li = document.createElement('li');
        li.textContent = `今天应该复习的日期：${formattedDate}`;
        reviewDatesList.appendChild(li);
    });
}

// 初始化显示今天的计划和复习计划
window.onload = () => {
    displayTodayPlans();
    printReviewDates(currentDate);
    document.getElementById('plan-input').focus();
};