@echo off
echo ===========================================
echo 🚀 Git 子模块清理与重新上传脚本
echo ===========================================

:: 1️⃣ 切换到当前脚本所在目录
cd /d %~dp0

:: 2️⃣ 显示当前路径
echo 当前路径: %cd%
echo.

:: 3️⃣ 删除 passwordGenerator 子模块（如果存在）
echo 🧹 清理 passwordGenerator 子模块...
git submodule deinit -f passwordGenerator 2>nul
git rm -f passwordGenerator 2>nul
rmdir /s /q .git\modules\passwordGenerator 2>nul

:: 4️⃣ 删除 quizGame 子模块（如果存在）
echo 🧹 清理 quizGame 子模块...
git submodule deinit -f quizGame 2>nul
git rm -f quizGame 2>nul
rmdir /s /q .git\modules\quizGame 2>nul

:: 5️⃣ 删除残留配置
echo 🧼 清理完成，准备重新添加文件...
echo.

:: 6️⃣ 暂停让你确认文件夹真实存在
pause

:: 7️⃣ 添加新文件
git add .
git commit -m "replace submodules with real folders"
git push

echo.
echo ✅ 全部完成！请刷新 GitHub 页面查看结果。
pause
