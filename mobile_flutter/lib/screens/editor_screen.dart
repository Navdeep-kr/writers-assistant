import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../providers/ai_provider.dart';
import '../constants/theme.dart';
import '../widgets/user_badge.dart';
import '../widgets/dashboard_insight_card.dart';

class EditorScreen extends StatefulWidget {
  const EditorScreen({super.key});

  @override
  State<EditorScreen> createState() => _EditorScreenState();
}

class _EditorScreenState extends State<EditorScreen> {
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      context.read<AIProvider>().onTextChanged(_controller.text);
    });
  }

  @override
  Widget build(BuildContext context) {
    final ai = context.watch<AIProvider>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          _buildTopNavBar(),
          _buildSubHeader(),
          Expanded(
            child: Row(
              children: [
                Expanded(flex: 7, child: _buildEditorArea(ai)),
                VerticalDivider(width: 1, color: Colors.white.withOpacity(0.05)),
                Expanded(flex: 3, child: _buildSidebar(ai)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopNavBar() {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 24),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border(bottom: BorderSide(color: Colors.white.withOpacity(0.05))),
      ),
      child: Row(
        children: [
          const Icon(LucideIcons.penLine, color: Colors.indigoAccent, size: 24),
          const SizedBox(width: 12),
          Text(
            'Writers Assistant',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const Spacer(),
          _buildNavLink('Documents', LucideIcons.folder, false),
          _buildNavLink('Editor', LucideIcons.fileEdit, true),
          _buildNavLink('Analytics', LucideIcons.barChart, false),
          const Spacer(),
          const UserBadge(),
          const SizedBox(width: 16),
          _buildIconButton(LucideIcons.logOut, 'Logout'),
        ],
      ),
    );
  }

  Widget _buildNavLink(String label, IconData icon, bool isActive) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 16, color: isActive ? Colors.white : AppColors.textSecondary),
              const SizedBox(width: 8),
              Text(
                label,
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 14,
                  fontWeight: isActive ? FontWeight.w800 : FontWeight.w600,
                  color: isActive ? Colors.white : AppColors.textSecondary,
                ),
              ),
            ],
          ),
          if (isActive) ...[
            const SizedBox(height: 4),
            Container(width: 20, height: 2, color: AppColors.primary),
          ],
        ],
      ),
    );
  }

  Widget _buildSubHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Row(
        children: [
          Text(
            'Untitled Draft',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: const Color(0xFF22D3EE),
            ),
          ),
          const SizedBox(width: 16),
          _buildPillTag('DRAFT'),
          const SizedBox(width: 8),
          _buildPillTag('V2.0'),
          const Spacer(),
          _buildToolButton('Templates', null),
          const SizedBox(width: 12),
          _buildToolButton('Goals', LucideIcons.target),
          const SizedBox(width: 12),
          _buildPrimaryButton('Share', LucideIcons.link),
        ],
      ),
    );
  }

  Widget _buildEditorArea(AIProvider ai) {
    return Container(
      margin: const EdgeInsets.all(24),
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: const Color(0xFF0C0D0F),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: TextField(
        controller: _controller,
        maxLines: null,
        expands: true,
        style: GoogleFonts.plusJakartaSans(
          fontSize: 18,
          color: Colors.white,
          height: 1.6,
        ),
        decoration: InputDecoration(
          hintText: 'Start your masterpiece here...',
          hintStyle: GoogleFonts.plusJakartaSans(color: AppColors.textMuted),
          border: InputBorder.none,
        ),
      ),
    );
  }

  Widget _buildSidebar(AIProvider ai) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSidebarTabs(),
          const SizedBox(height: 32),
          Text(
            'Writing Insights',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 20,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 24),
          DashboardInsightCard(
            title: 'Readability',
            category: 'General',
            score: ai.insights['readability']?['grade']?.toString() ?? '100',
            trend: '+4.2%',
            themeColor: const Color(0xFF22D3EE),
            progress: 1.0,
          ),
          const SizedBox(height: 16),
          DashboardInsightCard(
            title: 'AI Likelihood',
            category: ai.humanLikenessLabel,
            score: '${ai.aiLikelihood}%',
            themeColor: const Color(0xFF8B5CF6),
            progress: ai.aiLikelihood / 100,
          ),
        ],
      ),
    );
  }

  Widget _buildSidebarTabs() {
    return Container(
      height: 44,
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        children: [
          _buildTabItem('Insights', true),
          _buildTabItem('Style', false),
        ],
      ),
    );
  }

  Widget _buildTabItem(String label, bool isActive) {
    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: isActive ? Colors.white.withOpacity(0.05) : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Center(
          child: Text(
            label,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 12,
              fontWeight: isActive ? FontWeight.w800 : FontWeight.w600,
              color: isActive ? Colors.white : AppColors.textSecondary,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPillTag(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Text(
        label,
        style: GoogleFonts.plusJakartaSans(
          fontSize: 10,
          fontWeight: FontWeight.w800,
          color: AppColors.textSecondary,
        ),
      ),
    );
  }

  Widget _buildToolButton(String label, IconData? icon) {
    return TextButton(
      onPressed: () {},
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 16, color: Colors.white),
            const SizedBox(width: 8),
          ],
          Text(
            label,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPrimaryButton(String label, IconData icon) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFF6366F1), // Indigo primary
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: Colors.white),
          const SizedBox(width: 8),
          Text(
            label,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 14,
              fontWeight: FontWeight.w800,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIconButton(IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.error.withOpacity(0.2)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: AppColors.error),
          const SizedBox(width: 8),
          Text(
            label,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              color: AppColors.error,
            ),
          ),
        ],
      ),
    );
  }
}
