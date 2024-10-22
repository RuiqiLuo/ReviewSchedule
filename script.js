// 获取当前日期
const currentDate = new Date();

// 从localStorage加载计划
const todayPlans = JSON.parse(localStorage.getItem('todayPlans')) || [];

// 添加计划
function addPlan() {
    const planInput = document.getElementById('plan-input');
    const plan = planInput.value.trim();
    if (plan) {
        todayPlans.push({ plan: plan, completed: false });
        savePlans();
        planInput.value = '';
        displayTodayPlans();
    }
}

// 保存计划到localStorage
function savePlans() {
    localStorage.setItem('todayPlans', JSON.stringify(todayPlans));
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
    todayPlans[index].completed = !todayPlans[index].completed;
    savePlans();
    displayTodayPlans();
}

// 打印今天应该复习的日期
function printReviewDates(currentDate) {
    const intervals = [1, 2, 4, 7, 15, 30, 60, 90, 180, 365];
    const reviewDatesList = document.getElementById('review-plans-list');
    reviewDatesList.innerHTML = '';

    const uniqueDates = new Set();
    intervals.forEach((interval) => {
        const reviewDate = new Date(currentDate);
        reviewDate.setDate(currentDate.getDate() - interval);
        const formattedDate = `${reviewDate.getFullYear()}-${(reviewDate.getMonth() + 1).toString().padStart(2, '0')}-${reviewDate.getDate().toString().padStart(2, '0')}`;
        if (!uniqueDates.has(formattedDate)) {
            uniqueDates.add(formattedDate);
            const li = document.createElement('li');
            li.textContent = formattedDate;
            reviewDatesList.appendChild(li);
        }
    });
}

// 初始化显示今天的计划和复习计划
window.onload = () => {
    displayTodayPlans();
    printReviewDates(currentDate);
    document.getElementById('plan-input').focus();
};